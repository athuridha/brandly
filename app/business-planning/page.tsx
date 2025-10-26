import Link from "next/link"
import { Button } from "@/components/ui/button"
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

export default function BusinessPlanningPage() {
  const pricing = [
    {
      name: "Starter",
      price: "Rp2,5jt - Rp5jt",
      features: [
        "Landing page profesional",
        "Brand kit sederhana (logo + warna)",
        "Integrasi WhatsApp & Form",
        "Basic SEO",
      ],
    },
    {
      name: "Growth",
      price: "Rp6jt - Rp10jt",
      features: [
        "Multi-page website",
        "Brand guideline ringkas",
        "Copywriting dasar",
        "Setup Analytics",
        "Maintenance 1 bulan",
      ],
    },
    {
      name: "Scale",
      price: "Custom (di atas Rp10jt)",
      features: [
        "Kebutuhan khusus bisnis",
        "Integrasi pihak ketiga",
        "Komponen kustom",
        "Support prioritas",
      ],
    },
  ]

  const costs = [
    "Hosting & Domain",
    "Langganan tools (Figma, repo, tracker)",
    "Pemasaran (ads & materi promosi)",
    "Operasional (internet, listrik)",
    "(Opsional) Freelancer eksternal",
  ]

  const risks = [
    { risk: "Prospek lambat / lead kering", mitigation: "Perbanyak kanal, rutin konten, kemitraan" },
    { risk: "Scope creep proyek", mitigation: "Kontrak jelas, fitur bertahap, change request" },
    { risk: "Keterlambatan deliverable", mitigation: "Sprint plan, buffer, checklist QA" },
    { risk: "Biaya tak terduga", mitigation: "Kontrol biaya, paket transparan, review bulanan" },
  ]

  const milestones = [
    { time: "Q1", items: ["Validasi penawaran", "Portofolio 3 proyek", "Landing page live"] },
    { time: "Q2", items: ["5-8 proyek selesai", "Bangun referral", "Dokumentasi proses"] },
    { time: "Q3", items: ["Produk paketasi matang", "Retainer 3 klien", "Automasi basic"] },
    { time: "Q4", items: ["Skalakan pemasaran", "Partnership strategis", "Standardisasi QA"] },
  ]

  const swot = {
    strengths: [
      "Tim kecil gesit (desain + dev)",
      "One-stop (website + branding)",
      "Harga kompetitif & transparan",
    ],
    weaknesses: [
      "Brand awareness awal rendah",
      "Resource terbatas untuk proyek besar",
      "Portofolio masih berkembang",
    ],
    opportunities: [
      "UMKM semakin butuh digitalisasi",
      "Permintaan landing page naik",
      "Kemitraan dengan komunitas kampus/UMKM",
    ],
    threats: [
      "Persaingan agensi/freelancer",
      "Perubahan tren/algoritma pemasaran",
      "Sensitivitas harga pasar",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Brandly</div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/business-model-canvas" className="text-foreground hover:text-primary transition">
              Business Model Canvas
            </Link>
            <Link href="/business-planning" className="text-foreground hover:text-primary transition font-semibold">
              Business Planning
            </Link>
            <Link href="/presentation" className="text-foreground hover:text-primary transition">
              Presentasi Project
            </Link>
          </div>
        </div>
      </nav>

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
                <li key={i} className="mb-2">• {c}</li>
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
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Brandly</h3>
              <p className="opacity-75">Jasa Pembuatan Website & Branding untuk bisnis Anda</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 opacity-75">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Website Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Branding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    SEO
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 opacity-75">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 opacity-75">
                <li>Email: info@brandly.id</li>
                <li>Phone: +62 XXX XXXX XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center opacity-75">
            <p>&copy; 2025 Brandly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

