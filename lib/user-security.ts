import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
 
const scrypt = promisify(scryptCallback)
 
export async function hashUserPassword(password: string) {
  const salt = randomBytes(16)
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return `scrypt:${salt.toString("hex")}:${derivedKey.toString("hex")}`
}
 
export async function verifyUserPassword(password: string, encodedHash: string) {
  const [algorithm, saltHex, digestHex, extraPart] = encodedHash.split(":")
  if (
    algorithm !== "scrypt" ||
    extraPart !== undefined ||
    !saltHex ||
    !digestHex ||
    !/^[\da-f]+$/i.test(saltHex) ||
    !/^[\da-f]+$/i.test(digestHex)
  ) {
    return false
  }
 
  const salt = Buffer.from(saltHex, "hex")
  const expectedDigest = Buffer.from(digestHex, "hex")
  if (salt.length !== 16 || expectedDigest.length !== 64) return false
 
  const actualDigest = (await scrypt(password, salt, expectedDigest.length)) as Buffer
  return timingSafeEqual(actualDigest, expectedDigest)
}
 
export function createUserJwt(user: { id: number; email: string; role: string }) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET belum diatur.")
 
  const issuedAt = Math.floor(Date.now() / 1000)
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url")
  const header = encode({ alg: "HS256", typ: "JWT" })
  const payload = encode({
    sub: String(user.id),
    email: user.email,
    role: user.role,
    iat: issuedAt,
    exp: issuedAt + 60 * 60 * 24,
  })
  const signingInput = `${header}.${payload}`
  const signature = createHmac("sha256", secret).update(signingInput).digest("base64url")
 
  return `${signingInput}.${signature}`
}
 
export type UserJwtPayload = {
  sub: string
  email: string
  role: string
  iat: number
  exp: number
}
 
export function verifyUserJwt(token: string): UserJwtPayload | null {
  const secret = process.env.JWT_SECRET
  if (!secret) return null
 
  const [headerPart, payloadPart, signaturePart, extraPart] = token.split(".")
  if (!headerPart || !payloadPart || !signaturePart || extraPart !== undefined) return null
 
  try {
    const header = JSON.parse(Buffer.from(headerPart, "base64url").toString("utf8")) as Record<string, unknown>
    if (header.alg !== "HS256" || header.typ !== "JWT") return null
 
    const signingInput = `${headerPart}.${payloadPart}`
    const expectedSignature = createHmac("sha256", secret).update(signingInput).digest()
    const actualSignature = Buffer.from(signaturePart, "base64url")
    if (
      actualSignature.length !== expectedSignature.length ||
      !timingSafeEqual(actualSignature, expectedSignature)
    ) {
      return null
    }
 
    const parsedPayload: unknown = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"))
    if (!parsedPayload || typeof parsedPayload !== "object") return null
 
    const payload = parsedPayload as Record<string, unknown>
    const now = Math.floor(Date.now() / 1000)
    if (
      typeof payload.sub !== "string" ||
      !/^\d+$/.test(payload.sub) ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number" ||
      payload.exp <= now ||
      payload.exp <= payload.iat ||
      payload.iat > now + 60
    ) {
      return null
    }
 
    return payload as UserJwtPayload
  } catch {
    return null
  }
}