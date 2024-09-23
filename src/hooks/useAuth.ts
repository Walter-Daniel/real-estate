// hooks/useAuth.ts
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/login"

export const useAuth = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()


  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the desired profile page
      router.push("/profile");
    }
  }, [status, router]);

  const login = async (email: string, password: string) => {
    const result = await loginAction({email, password})
    if (result.ok) {
        await update();

      return { success: true }
    } else {
      return { success: false, error: "Invalid credentials" }
    }
  }

  const logout = async () => {
    const result = await fetch("/api/auth/signout", { method: "POST" })
    if (result.ok) {
      await update()
      router.refresh()
    }
  }

  return { session, status, login, logout }
}