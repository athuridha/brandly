import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Zap, Lightbulb, Heart, Target, Rocket, DollarSign, TrendingUp, Layers } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

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
      "Kualitas tinggi: Tim desainer, developer, & PM berpengalaman dalam satu paket.",
      "Harga kompetitif: Tidak ada pajak (NPWP) = margin lebih besar bisa dinegosiasikan untuk klien.",
      "Fleksibel & responsif: Personal touch dari tim berpengalaman vs tim besar agensi.",
      "Solusi lengkap: Design + Development + Branding + Maintenance dalam satu tempat.",
      "Proses cepat: Koordinasi mudah karena tim kecil yang gesit dan adaptif.",
      "Support berkelanjutan: Dedicated PM + developer untuk maintenance & improvement.",
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
      "SDM - UI/UX Designer: 1 orang (design system, prototyping, user experience)",
      "SDM - Graphic Designer: 1 orang (branding, logo, visual assets, marketing materials)",
      "SDM - Full-Stack Developer: 1 orang (backend, frontend, database, deployment)",
      "SDM - Project Manager & Business Consultant: 1 orang (project coordination, client relations, strategy)",
      "Software & Tools (Figma Pro, Adobe Suite, VS Code, Trello, CMS platform)",
      "Portofolio Proyek & Case Studies dari klien sebelumnya",
      "Brand 'Brandly' & Track Record Reputasi",
    ],
    channels: [
      "Media Sosial (Instagram, LinkedIn).",
      "Portofolio online (Website Brandly).",
      "Rekomendasi (Word of Mouth) dari klien.",
      "Jaringan internal kampus & komunitas.",
      "Iklan Digital (IG Ads, Google Ads).",
    ],
    costStructure: [
      "Biaya SDM Desainer: Rp 1.5-2jt per project + Rp 500rb maintenance/bulan",
      "Biaya SDM Developer: Rp 2-2.5jt per project + Rp 750rb support teknis/bulan",
      "Biaya SDM PM & Konsultan: Rp 1-1.5jt per project + Rp 300rb koordinasi/bulan",
      "Biaya Software & Tools (Figma Pro, Adobe Suite, VS Code, CMS): Rp 2-3jt/bulan",
      "Biaya Infrastruktur (Hosting website klien & domain): Rp 500rb-1jt per klien/tahun",
      "Biaya Pemasaran & Promosi (Ads digital, konten): Rp 2-3jt/bulan",
      "Biaya Operasional (Internet, Listrik, workspace): Rp 1.5-2jt/bulan",
      "(Opsional) Biaya subkontraktor eksternal: Rp 500rb-1.5jt per project",
    ],
    revenueStreams: [
      "Paket Starter (Rp 5-10jt): Landing page + brand kit dasar + basic SEO",
      "Paket Growth (Rp 10-20jt): Multi-page website + brand guideline + copywriting + analytics",
      "Paket Scale (Custom >Rp 20jt): Website custom + integrasi pihak ketiga + support prioritas",
      "Maintenance Bulanan (Rp 1-3jt): Update konten, keamanan, backup, support teknis",
      "Jasa Tambahan (Pay-per-item): SEO advanced, iklan management, konten creation",
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

  const BMCCard = ({ title, items, icon: Icon, bgColor, borderColor, textColor, number }) => (
    <Card
      className={`p-6 ${bgColor} ${borderColor} relative overflow-hidden group hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-15 group-hover:opacity-25 transition-opacity">
        <Icon className="w-6 h-6" />
        <span className="text-lg font-bold text-primary">{number}</span>
      </div>

      <h3 className={`text-base font-bold ${textColor} mb-3 pr-16`}>{title}</h3>
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
      <Navbar />

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
          {/* Main BMC Grid Layout - 5 columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Row 1: Key Partners, Key Activities, Value Proposition, Customer Relationships, Customer Segments */}
            
            {/* Key Partners (1,1) */}
            <BMCCard
              title="Key Partners"
              items={bmc.keyPartners}
              icon={iconMap.keyPartners}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
              number="8"
            />

            {/* Key Activities + Key Resources (1,2 and 2,2) */}
            <div className="flex flex-col gap-4">
              <BMCCard
                title="Key Activities"
                items={bmc.keyActivities}
                icon={iconMap.keyActivities}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="7"
              />
              <BMCCard
                title="Key Resources"
                items={bmc.keyResources}
                icon={iconMap.keyResources}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="6"
              />
            </div>

            {/* Value Proposition (1,3 and 2,3) - Center */}
            <BMCCard
              title="Value Propositions"
              items={bmc.valueProposition}
              icon={iconMap.valueProposition}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
              number="2"
            />

            {/* Customer Relationships + Channels (1,4 and 2,4) */}
            <div className="flex flex-col gap-4">
              <BMCCard
                title="Customer Relationships"
                items={bmc.customerRelationships}
                icon={iconMap.customerRelationships}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="4"
              />
              <BMCCard
                title="Channels"
                items={bmc.channels}
                icon={iconMap.channels}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="3"
              />
            </div>

            {/* Customer Segments (1,5) */}
            <BMCCard
              title="Customer Segments"
              items={bmc.customerSegments}
              icon={iconMap.customerSegments}
              bgColor="bg-white"
              borderColor="border border-blue-200"
              textColor="text-gray-900"
              number="1"
            />
          </div>

          {/* Bottom Row: Cost Structure and Revenue Streams */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Cost Structure (3,1-3) */}
            <div className="md:col-span-2">
              <BMCCard
                title="Cost Structure"
                items={bmc.costStructure}
                icon={iconMap.costStructure}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="9"
              />
            </div>

            {/* Revenue Streams (3,4-5) */}
            <div className="md:col-span-3">
              <BMCCard
                title="Revenue Streams"
                items={bmc.revenueStreams}
                icon={iconMap.revenueStreams}
                bgColor="bg-white"
                borderColor="border border-blue-200"
                textColor="text-gray-900"
                number="5"
              />
            </div>
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
