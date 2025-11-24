"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Package } from "lucide-react"

export default function OrderSummary() {
    const searchParams = useSearchParams()
    const planName = searchParams.get("plan")

    const plans = {
        starter: {
            name: "Starter",
            price: "5-10 Juta",
            features: [
                "Landing Page Modern",
                "Logo & Brand Kit Dasar",
                "Mobile Responsive",
                "Basic SEO",
                "1x Revisi Gratis",
                "Durasi 2-3 Minggu",
            ],
        },
        growth: {
            name: "Growth",
            price: "10-20 Juta",
            features: [
                "Multi-Page Website (5-8 halaman)",
                "Brand Guideline Lengkap",
                "Professional Copywriting",
                "Google Analytics Setup",
                "Unlimited Revisi (2 minggu)",
                "1 Bulan Maintenance Gratis",
            ],
        },
        scale: {
            name: "Scale",
            price: "20+ Juta",
            features: [
                "Website Fully Custom",
                "Payment Gateway Integration",
                "CRM/Database Integration",
                "Advanced SEO & Performance",
                "3 Bulan Maintenance",
                "Priority Support 24/7",
            ],
        },
    }

    const selectedPlan = planName ? plans[planName.toLowerCase() as keyof typeof plans] : null

    if (!selectedPlan) {
        return (
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Kenapa Memilih Kami?
                </h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Tim profesional & berpengalaman</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Garansi kepuasan klien</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Support teknis prioritas</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Pengerjaan tepat waktu</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Card className="p-6 border-primary/20 bg-primary/5 sticky top-24">
            <div className="mb-6 pb-6 border-b border-border/50">
                <div className="flex items-center gap-2 text-primary mb-2">
                    <Package className="w-5 h-5" />
                    <span className="font-semibold text-sm uppercase tracking-wider">Paket Pilihan</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{selectedPlan.name}</h3>
                <div className="text-muted-foreground text-sm">Estimasi: Rp {selectedPlan.price}</div>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-sm">Yang Anda Dapatkan:</h4>
                <ul className="space-y-3">
                    {selectedPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    )
}
