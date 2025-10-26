import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Zap, Lightbulb, Heart, Target, Rocket, DollarSign, TrendingUp, Layers } from "lucide-react"

export default function BusinessModelCanvas() {
  const bmc = {
    keyPartners: [
      "Penyedia Hosting & Domain",
      "Freelance Copywriter & Content Writer",
      "Digital Marketing Agency (untuk rujukan klien)",
      "Mentor/Dosen Pembimbing",
    ],
    keyActivities: [
      "Desain UI/UX (Figma)",
      "Pengembangan Website (Coding / CMS)",
      "Desain Grafis (Logo & Brand Kit)",
      "Manajemen Proyek",
      "Pemasaran & Penjualan",
      "Konsultasi Kebutuhan Klien",
    ],
    valueProposition: [
      "Website profesional, modern, & responsif.",
      "Harga terjangkau dengan sistem paket.",
      "Solusi 'One-Stop' (Website + Branding).",
      "Proses konsultasi yang mudah dan cepat.",
      "Desain unik yang disesuaikan dengan identitas brand klien.",
      "Layanan maintenance & support.",
    ],
    customerRelationships: [
      "Konsultasi gratis (via WhatsApp/Zoom).",
      "Personal assistance (kontak langsung 1-on-1 dengan tim).",
      "Grup project khusus (misal: WA Group).",
      "Paket maintenance & support (berlangganan).",
    ],
    customerSegments: [
      "UMKM (Usaha Mikro, Kecil, Menengah) yang ingin go digital.",
      "Profesional & Freelancer (misal: Fotografer, Konsultan, Desainer) yang butuh portofolio online.",
      "Perusahaan rintisan (Startup) tahap awal.",
      "Organisasi non-profit/komunitas.",
    ],
    keyResources: [
      "Sumber Daya Manusia (Tim Kelompok 5: Desainer, Developer, PM).",
      "Software & Tools (Figma, VS Code, Trello, dll).",
      "Portofolio Proyek.",
      "Brand 'Brandly' & Reputasi.",
    ],
    channels: [
      "Media Sosial (Instagram, LinkedIn).",
      "Portofolio online (Website Brandly).",
      "Rekomendasi (Word of Mouth) dari klien.",
      "Jaringan internal kampus & komunitas.",
      "Iklan Digital (IG Ads, Google Ads).",
    ],
    costStructure: [
      "Biaya Software & Langganan (Figma, Trello, Adobe, dll).",
      "Biaya Infrastruktur (Hosting & Domain).",
      "Biaya Pemasaran (Iklan digital).",
      "Biaya Operasional (Internet, Listrik).",
      "(Jika ada) Biaya freelancer eksternal.",
    ],
    revenueStreams: [
      "Biaya Jasa Pembuatan Website (Project-based).",
      "Biaya Jasa Desain Branding (Logo, Brand Kit).",
      "Paket Maintenance Bulanan (Subscription).",
      "Jasa Tambahan (Update konten, SEO).",
    ],
  }

  const iconMap = {
    keyPartners: Users,
    keyActivities: Zap,
    valueProposition: Lightbulb,
    customerRelationships: Heart,
    customerSegments: Target,
    keyResources: Rocket,
    channels: Layers,
    costStructure: DollarSign,
    revenueStreams: TrendingUp,
  }

  const BMCCard = ({ title, items, icon: Icon, bgColor, borderColor, textColor }) => (
    <Card
      className={`p-6 ${bgColor} ${borderColor} relative overflow-hidden group hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Brandly</div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/business-model-canvas" className="text-foreground hover:text-primary transition font-semibold">
              Business Model Canvas
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Model Canvas</h1>
          <p className="text-lg opacity-90">Strategi bisnis Brandly: Jasa Pembuatan Website & Branding</p>
        </div>
      </section>

      {/* BMC Grid */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-50 to-gray-50 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Key Partners, Key Activities, Value Proposition, Customer Relationships, Customer Segments */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Key Partners */}
            <BMCCard
              title="Key Partners"
              items={bmc.keyPartners}
              icon={iconMap.keyPartners}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />

            {/* Key Activities */}
            <BMCCard
              title="Key Activities"
              items={bmc.keyActivities}
              icon={iconMap.keyActivities}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />

            {/* Value Proposition - Center */}
            <BMCCard
              title="Value Propositions"
              items={bmc.valueProposition}
              icon={iconMap.valueProposition}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />

            {/* Customer Relationships */}
            <BMCCard
              title="Customer Relationships"
              items={bmc.customerRelationships}
              icon={iconMap.customerRelationships}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />

            {/* Customer Segments */}
            <BMCCard
              title="Customer Segments"
              items={bmc.customerSegments}
              icon={iconMap.customerSegments}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />
          </div>

          {/* Middle Row: Key Resources (spans 2 cols) and Channels (spans 3 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Key Resources */}
            <div className="md:col-span-2">
              <BMCCard
                title="Key Resources"
                items={bmc.keyResources}
                icon={iconMap.keyResources}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
              />
            </div>

            {/* Channels */}
            <div className="md:col-span-3">
              <BMCCard
                title="Channels"
                items={bmc.channels}
                icon={iconMap.channels}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
              />
            </div>
          </div>

          {/* Bottom Row: Cost Structure (spans 2.5 cols) and Revenue Streams (spans 2.5 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost Structure */}
            <BMCCard
              title="Cost Structure"
              items={bmc.costStructure}
              icon={iconMap.costStructure}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />

            {/* Revenue Streams */}
            <BMCCard
              title="Revenue Streams"
              items={bmc.revenueStreams}
              icon={iconMap.revenueStreams}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="bg-secondary/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Ringkasan Strategi Bisnis</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Proposisi Nilai Utama</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brandly menawarkan solusi website profesional dan branding yang terjangkau untuk UMKM, Profesional,
                Freelancer, dan Startup. Dengan kombinasi desain modern, pengembangan berkualitas, dan dukungan
                berkelanjutan, kami membantu bisnis Anda go-digital dengan percaya diri.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Model Pendapatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kami menggunakan model pendapatan hybrid: biaya proyek one-time untuk pembuatan website dan branding,
                ditambah biaya berlangganan bulanan untuk maintenance dan support, serta jasa tambahan untuk layanan
                premium seperti update konten dan SEO lanjutan.
              </p>
            </Card>
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
