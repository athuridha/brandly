"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function OrderForm() {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Form states
    const [service, setService] = useState("")
    const [budget, setBudget] = useState("")
    const [message, setMessage] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {
        const plan = searchParams.get("plan")
        if (plan) {
            switch (plan.toLowerCase()) {
                case "starter":
                    setService("website")
                    setBudget("small")
                    setMessage("Saya tertarik dengan paket Starter (5-10 Juta).")
                    break
                case "growth":
                    setService("website")
                    setBudget("medium")
                    setMessage("Saya tertarik dengan paket Growth (10-20 Juta).")
                    break
                case "scale":
                    setService("custom")
                    setBudget("large")
                    setMessage("Saya tertarik dengan paket Scale (20+ Juta).")
                    break
            }
        }
    }, [searchParams])


    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = {
                name: (document.getElementById("name") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value,
                whatsapp: (document.getElementById("whatsapp") as HTMLInputElement).value,
                company: (document.getElementById("company") as HTMLInputElement).value,
                website: (document.getElementById("website") as HTMLInputElement).value || null,
                service,
                budget,
                timeline: (document.getElementById("timeline") as HTMLSelectElement).value,
                payment_method: paymentMethod,
                message,
                status: "pending" as const
            }

            const { data, error } = await supabase
                .from('orders')
                .insert([formData])
                .select()

            if (error) throw error

            console.log('Order created:', data)
            setIsLoading(false)
            setIsSuccess(true)
        } catch (error) {
            console.error('Error submitting order:', error)
            alert('Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.')
            setIsLoading(false)
        }
    }


    if (isSuccess) {
        return (
            <Card className="p-8 text-center bg-primary/5 border-primary/20">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pesanan Diterima!</h3>
                <p className="text-muted-foreground mb-6">
                    Terima kasih telah mempercayakan project Anda kepada kami. Tim kami akan segera menghubungi Anda melalui email/WhatsApp untuk diskusi lebih lanjut.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Kirim Pesanan Lain
                </Button>
            </Card>
        )
    }

    return (
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border/50 shadow-xl">
            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Mulai Project Anda</h3>
                <p className="text-muted-foreground">Isi formulir di bawah ini untuk konsultasi gratis.</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="company">Nama Perusahaan / Bisnis</Label>
                        <Input id="company" placeholder="PT Brandly Digital" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website Saat Ini (Opsional)</Label>
                        <Input id="website" placeholder="https://example.com" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                        <Input id="whatsapp" type="tel" placeholder="081234567890" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeline">Estimasi Waktu</Label>
                        <select
                            id="timeline"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Target Selesai</option>
                            <option value="urgent">Urgent (&lt; 1 Bulan)</option>
                            <option value="normal">Normal (1-2 Bulan)</option>
                            <option value="relaxed">Santai (&gt; 2 Bulan)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="service">Layanan yang Dibutuhkan</Label>
                    <select
                        id="service"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        required
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                    >
                        <option value="" disabled>Pilih Layanan</option>
                        <option value="website">Website Development</option>
                        <option value="branding">Brand Identity</option>
                        <option value="maintenance">Maintenance & SEO</option>
                        <option value="custom">Custom Solution</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="budget">Estimasi Budget</Label>
                    <select
                        id="budget"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    >
                        <option value="" disabled>Pilih Range Budget</option>
                        <option value="small">Rp 5 - 10 Juta</option>
                        <option value="medium">Rp 10 - 20 Juta</option>
                        <option value="large">Rp 20 Juta +</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payment">Metode Pembayaran</Label>
                    <select
                        id="payment"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        required
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="" disabled>Pilih Metode Pembayaran</option>
                        <option value="transfer">Bank Transfer (BCA/Mandiri)</option>
                        <option value="ewallet">E-Wallet (GoPay/OVO/Dana)</option>
                        <option value="cc">Kartu Kredit (via Midtrans)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Detail Project</Label>
                    <Textarea
                        id="description"
                        placeholder="Ceritakan sedikit tentang project yang ingin Anda buat..."
                        className="min-h-[100px]"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        <>
                            Kirim Permintaan <Send className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </Card>
    )
}
