import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyUserJwt } from "@/lib/user-security"
 
export async function POST() {
  const token = (await cookies()).get("auth_token")?.value
  if (token) {
    const payload = verifyUserJwt(token)
    const userId = payload ? Number(payload.sub) : NaN
 
    if (Number.isSafeInteger(userId) && userId > 0) {
      try {
        await prisma.user.updateMany({
          where: { id: userId, token },
          data: { token: null },
        })
      } catch (error) {
        console.error("Failed to revoke login token:", error)
      }
    }
  }
 
  const response = NextResponse.json({ success: true })
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  })
  return response
}