'use client'
 
import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
 
type UserFormUser = {
  id: number
  fullname: string
  email: string
  role: string
}
 
type UserFormProps = {
  userId?: string
}
 
export function UserForm({ userId }: UserFormProps) {
  const router = useRouter()
  const [user, setUser] = useState<UserFormUser | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(userId))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("staff")
 
  useEffect(() => {
    if (!userId) return
 
    let isActive = true
    async function loadUser() {
      try {
        const response = await fetch(`/api/users/${userId}`)
        const result = await response.json()
        if (!response.ok) throw new Error(result.error ?? "Gagal memuat user.")
 
        if (isActive) {
          setUser(result.user)
          setFullname(result.user.fullname)
          setEmail(result.user.email)
          setRole(result.user.role)
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Gagal memuat user.")
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }
 
    void loadUser()
    return () => {
      isActive = false
    }
  }, [userId])
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setError("")
    try {
      const response = await fetch(userId ? `/api/users/${userId}` : "/api/users", {
        method: userId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullname.trim(),
          email: email.trim(),
          ...(password ? { password } : {}),
          role,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Gagal menyimpan user.")
      router.push("/admin/user-management")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Gagal menyimpan user.")
    } finally {
      setIsSaving(false)
    }
  }
 
  return (
    <Card className="m-6 px-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{userId ? "Edit user" : "Tambah user"}</h1>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/user-management")}>
          <ArrowLeft aria-hidden="true" />
          Kembali
        </Button>
      </div>
 
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      {isLoading ? (
        <p className="mt-5 text-sm text-muted-foreground">Memuat user...</p>
      ) : userId && !user ? null : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 rounded-md border p-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label htmlFor="fullname" className="text-sm font-medium">Nama lengkap</label>
            <Input id="fullname" value={fullname} onChange={(event) => setFullname(event.target.value)} required maxLength={191} />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={191} />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">{user ? "Password baru" : "Password"}</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required={!user}
              minLength={8}
              autoComplete="new-password"
              placeholder={user ? "Kosongkan jika tidak diubah" : "Minimal 8 karakter"}
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/user-management")} disabled={isSaving}>
              <X aria-hidden="true" />
              Batal
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Menyimpan..." : user ? "Simpan perubahan" : "Buat user"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}