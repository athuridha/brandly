import { Button } from "@/components/ui/button"
import type React from "react"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Briefcase,
  Users,
  BarChart,
  Target,
  ShieldAlert,
  CalendarCheck,
  PiggyBank,
  Rocket,
  Layers,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BusinessPlanningPage() {
  const pricing = [
    {
      name: "Starter",
      price: "Rp 5-10jt",
      features: [
        "Landing page + brand kit dasar",
        "Logo design + color palette",
        "WhatsApp/contact form integration",
        "Basic SEO optimization",
        "1x revision free",
        "Durasi: 2-3 minggu",
      ],
    },
    {
      name: "Growth",
      price: "Rp 10-20jt",
      features: [
        "Multi-page website (5-8 pages)",
        "Brand guideline lengkap",
        "Professional copywriting",
        "Google Analytics setup",
        "Unlimited revisions (2 minggu)",
        "1 bulan maintenance gratis",
        "Durasi: 3-4 minggu",
      ],
    },
    {
      name: "Scale",
      price: "Custom >Rp 20jt",
      features: [
        "Website fully custom sesuai kebutuhan",
        "Payment gateway & e-commerce (opsional)",
        "CRM/database integration",
        "Advanced SEO & performance optimization",
        "3 bulan maintenance included",
        "Priority support 24/7",
        "Durasi: 4-6 minggu (tergantung scope)",
      ],
    },
  ]

  const costs = [
    "**Biaya SDM** - Desainer: 20-24% | Developer: 25-30% | PM: 15-20% per paket",
    "**Biaya Tetap Bulanan** - Software Rp 2-3jt + Marketing Rp 2-3jt + Operasional Rp 1.5-2jt",
    "**Maintenance** - 30% SDM teknis | 70% tools & operasional",
    "Integrasi Biaya: Paket Starter 40% operasional | Growth 33% | Scale 26%",
    "Hosting & Domain per klien: Rp 500rb-1jt/tahun (disupport/dibayar klien)",
  ]

  const risks = [
    { 
      risk: "Lead/prospek lambat atau lead kering", 
      mitigation: "Perbanyak channel marketing, rutin content creation, build partnerships, referral program" 
    },
    { 
      risk: "Scope creep & project overrun", 
      mitigation: "Kontrak jelas & detailed, milestone-based delivery, formal change request process" 
    },
    { 
      risk: "Keterlambatan deliverable", 
      mitigation: "Sprint planning, buffer time allocation, QA checklist, weekly progress tracking" 
    },
    { 
      risk: "Biaya tak terduga / cost overrun", 
      mitigation: "Cost control strict, pricing transparan, monthly budget review, contingency fund" 
    },
    { 
      risk: "Quality issue & client dissatisfaction", 
      mitigation: "Standardized QA process, design review iterations, post-launch support, feedback loop" 
    },
    { 
      risk: "Tim member attrition / key person risk", 
      mitigation: "Cross-training, documentation complete, competitive compensation, positive work culture" 
    },
  ]

  const milestones = [
    { 
      time: "Q1", 
      items: [
        "Validasi pasar & fine-tune pricing",
        "Buat portfolio 3-5 proyek showcase",
        "Launch landing page Brandly",
        "Setup social media marketing strategy",
      ] 
    },
    { 
      time: "Q2", 
      items: [
        "Target 5-8 proyek selesai",
        "Bangun referral program & partnerships",
        "Dokumentasi process & SOP standardisasi",
        "Tracking customer satisfaction & retention",
      ] 
    },
    { 
      time: "Q3", 
      items: [
        "Paketisasi produk matang & siap scale",
        "Akuisisi 3 klien retainer (recurring revenue)",
        "Automasi basic (invoice, reporting, scheduling)",
        "Case study dokumentasi & content marketing",
      ] 
    },
    { 
      time: "Q4", 
      items: [
        "Scale marketing spend (ads, content, partnership)",
        "Strategic partnership dengan digital agencies",
        "Standardisasi QA & delivery excellence",
        "Plan ekspansi tahun depan (team atau layanan baru)",
      ] 
    },
  ]

  const swot = {
    strengths: [
      "Tim 4 orang berpengalaman (Designer, Developer, PM, Graphic Designer)",
      "Solusi one-stop: design + development + branding + maintenance",
      "Harga kompetitif (tanpa pajak = flexible margin)",
      "Proses cepat karena tim kecil yang gesit",
      "Profit sharing transparan untuk SDM",
    ],
    weaknesses: [
      "Brand awareness masih rendah (new player)",
      "Resource terbatas untuk proyek besar/kompleks",
      "Portofolio & track record masih berkembang",
      "Belum memiliki office infrastructure formal",
    ],
    opportunities: [
      "UMKM semakin butuh digitalisasi (pasar besar)",
      "Permintaan website & branding terus naik post-pandemi",
      "Kemitraan dengan komunitas kampus & UMKM associations",
      "Retainer model untuk recurring revenue stable",
      "Ekspansi ke layanan digital marketing & SEO",
    ],
    threats: [
      "Persaingan agensi web agency established & freelancer individual",
      "Price war dari kompetitor dengan business model serupa",
      "Perubahan tren design & teknologi yang cepat",
      "Client churn jika service quality tidak konsisten",
      "Economic downturn = pengurangan budget digital klien",
    ],
  }

  // Helper function untuk render bold text dengan **text**
  const renderText = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part: string, i: number) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-200 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Planning</h1>
          <p className="text-lg opacity-90">Rencana bisnis Brandly untuk validasi, pertumbuhan, dan skala</p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Ringkasan Eksekutif</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Brandly menyediakan jasa pembuatan website dan branding untuk UMKM, Freelancer, dan Startup.</li>
              <li>Fokus 12 bulan: validasi pasar, bangun portofolio, paketkan layanan, dan retainer maintenance.</li>
              <li>Diferensiasi: proses cepat, desain modern, paket transparan, support ramah.</li>
              <li>Target: 12–20 proyek di tahun pertama, 3 klien retainer aktif.</li>
            </ul>
          </Card>
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Target Pasar</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>UMKM butuh kehadiran digital cepat</li>
              <li>Profesional/Freelancer butuh portfolio online</li>
              <li>Startup awal butuh identitas brand</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SWOT + Positioning */}
      <section className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <BarChart className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">SWOT</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Strengths</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {swot.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Weaknesses</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {swot.weaknesses.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Opportunities</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {swot.opportunities.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Threats</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {swot.threats.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Positioning & Taktik</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>Positioning: solusi cepat, modern, terjangkau untuk go-digital.</li>
                <li>Channel: Instagram, LinkedIn, website portfolio, referral, komunitas.</li>
                <li>Konten: studi kasus, before/after desain, edukasi singkat.</li>
                <li>Offer: paket jelas, diskon early client, garansi minor fix.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing + Costs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((p, idx) => (
            <Card key={idx} className="p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                </div>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{p.price}</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </Card>
          ))}

          <Card className="p-8 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Struktur Biaya</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-x-6 text-muted-foreground">
              {costs.map((c, i) => (
                <li key={i} className="mb-2">• {renderText(c)}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <CalendarCheck className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Milestone & Timeline (12 Bulan)</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{m.time}</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {m.items.map((it, i) => (
                    <li key={i}>• {it}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management + Proyeksi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Manajemen Risiko</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              {risks.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-1 text-primary" />
                  <span>
                    <span className="font-medium text-foreground">{r.risk}:</span> {r.mitigation}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Target & Proyeksi Ringkas</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Target proyek: 12–20 proyek / tahun</li>
              <li>Retainer: 3 klien aktif (maintenance bulanan)</li>
              <li>Fokus marjin: paket Growth & Scale</li>
              <li>Perbaikan berkelanjutan: template, komponen, SOP</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Siap Eksekusi Rencana?</h3>
          <p className="mb-8 opacity-90">
            Mulai dari paket Starter atau konsultasi gratis untuk menyusun rencana yang paling pas untuk bisnis Anda.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Konsultasi Gratis
            </Button>
            <Button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground">
              Lihat Paket
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

