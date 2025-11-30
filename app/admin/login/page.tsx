"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Lock, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminLogin() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // Query database untuk verify credentials
            const { data, error: dbError } = await supabase
                .from('admins')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single()

            if (dbError || !data) {
                setError("Username atau password salah")
                setIsLoading(false)
                return
            }

            // Login berhasil
            localStorage.setItem("isAdminLoggedIn", "true")
            localStorage.setItem("adminUsername", username)
            localStorage.setItem("adminId", data.id)

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/admin/dashboard")
            }, 500)
        } catch (err) {
            console.error("Login error:", err)
            setError("Terjadi kesalahan saat login")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
            <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur border-border/60 shadow-xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
                    <p className="text-muted-foreground">Masuk untuk melihat pesanan masuk</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="brandly"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Memproses..." : "Masuk"}
                    </Button>
                </form>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                        Username: brandly<br />
                        Password: brandly123
                    </p>
                </div>
            </Card>
        </div>
    )
}
