import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Zap, Lightbulb, Heart, Target, Rocket, DollarSign, TrendingUp, Layers } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
      "**PAKET STARTER** (Rp 5-10jt): Desainer 20% | Developer 25% | PM 15% | Operasional 40%",
      "**PAKET GROWTH** (Rp 10-20jt): Desainer 22% | Developer 28% | PM 17% | Operasional 33%",
      "**PAKET SCALE** (>Rp 20jt): Desainer 24% | Developer 30% | PM 20% | Operasional 26%",
      "**Maintenance**: 30% SDM teknis | 70% tools & operasional",
      "**Biaya Tetap**: Software Rp 2-3jt + Marketing Rp 2-3jt + Operasional Rp 1.5-2jt/bulan",
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

  const BMCCard = ({ title, items, icon: Icon, bgColor, borderColor, textColor, number }) => {
    const renderText = (text) => {
      const parts = text.split(/(\*\*.*?\*\*)/);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      });
    };

    return (
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
              <span>{renderText(item)}</span>
            </li>
          ))}
        </ul>
      </Card>
    );
  };

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
          <h2 className="text-3xl font-bold text-foreground mb-8">Ringkasan Strategi Bisnis Brandly</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Tim & Sumber Daya</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brandly dijalankan oleh 4 orang profesional berpengalaman: UI/UX Designer, Graphic Designer, Full-Stack Developer, dan Project Manager. Kombinasi keahlian ini memastikan delivery berkualitas tinggi dengan koordinasi yang efisien.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">💰 Model Bisnis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Model hybrid: project-based (Paket Starter/Growth/Scale) + recurring revenue (maintenance bulanan). Profit sharing transparan per SDM. Tanpa pajak = margin flexible untuk negosiasi klien yang lebih kompetitif.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">🚀 Proposisi Nilai</h3>
              <p className="text-muted-foreground leading-relaxed">
                Solusi one-stop: design + development + branding + maintenance. Proses cepat karena tim kecil yang gesit. Support berkelanjutan dari PM dedicated. Harga terjangkau tanpa mengorbankan kualitas profesional.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">👥 Target Pasar</h3>
              <p className="text-muted-foreground leading-relaxed">
                UMKM yang butuh go-digital cepat, Profesional/Freelancer yang butuh portfolio online, dan Startup tahap awal yang butuh identitas brand. Fokus pada segmen yang price-sensitive tapi quality-conscious.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">📢 Strategi Distribusi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Multi-channel: Social media marketing (Instagram/LinkedIn), portfolio website Brandly, word of mouth dari klien, jaringan kampus & komunitas, dan digital ads. Fokus pada content marketing dan case studies.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">🤝 Kemitraan Strategis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Partnership dengan hosting providers, content writers, digital marketing agencies untuk rujukan klien, dan mentor/dosen pembimbing untuk guidance. Ecosystem yang saling mendukung pertumbuhan bisnis.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
