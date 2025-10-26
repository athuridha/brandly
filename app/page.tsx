import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Palette, Code, Smartphone, TrendingUp } from "lucide-react"

export default function Home() {
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
            <Link href="/presentation" className="text-foreground hover:text-primary transition">
              Presentasi Project
            </Link>
            <Button asChild>
              <a href="#contact">Hubungi Kami</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Wujudkan <span className="text-primary">Brand Digital</span> Anda
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Kami membantu UKM, Freelancer, dan Startup membangun kehadiran digital yang kuat dengan website
              profesional dan strategi branding yang tepat.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Mulai Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Lihat Portfolio
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <Palette className="w-24 h-24 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Desain Modern & Responsif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Layanan Kami</h2>
            <p className="text-lg text-muted-foreground">Solusi lengkap untuk kebutuhan digital Anda</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Pengembangan Website",
                description: "Website modern, cepat, dan mobile-responsive dengan teknologi terkini",
              },
              {
                icon: Palette,
                title: "Desain & Branding",
                description: "Logo, desain visual, dan identitas brand yang mencerminkan nilai bisnis Anda",
              },
              {
                icon: TrendingUp,
                title: "Strategi Digital",
                description: "Konsultasi branding dan strategi pemasaran digital untuk pertumbuhan bisnis",
              },
              {
                icon: Smartphone,
                title: "Mobile Optimization",
                description: "Optimasi sempurna untuk semua perangkat mobile dan desktop",
              },
              {
                icon: Zap,
                title: "SEO Dasar",
                description: "Optimasi mesin pencari untuk meningkatkan visibilitas online Anda",
              },
              {
                icon: TrendingUp,
                title: "Maintenance & Support",
                description: "Dukungan teknis berkelanjutan dan pembaruan website pasca-launching",
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition border-border">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Untuk Siapa Kami?</h2>
          <p className="text-lg text-muted-foreground">Kami melayani berbagai segmen bisnis</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "UKM & Bisnis Lokal",
              description: "Membantu bisnis lokal go-digital dengan website profesional dan terjangkau",
            },
            {
              title: "Freelancer & Profesional",
              description: "Bangun portfolio online yang menampilkan karya dan keahlian Anda",
            },
            {
              title: "Startup Baru",
              description: "Ciptakan identitas brand digital yang kuat sejak awal perjalanan bisnis",
            },
          ].map((segment, idx) => (
            <Card key={idx} className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">{segment.title}</h3>
              <p className="text-muted-foreground">{segment.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Memulai Perjalanan Digital Anda?</h2>
          <p className="text-lg mb-8 opacity-90">
            Hubungi kami hari ini untuk konsultasi gratis dan penawaran khusus untuk bisnis Anda
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Hubungi Kami Sekarang
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Brandly</h3>
              <p className="opacity-75">Jasa Pembuatan Website & Branding untuk bisnis Anda</p>
              <div className="mt-6 pt-6 border-t border-background/20">
                <p className="text-sm opacity-60 mb-3 font-semibold">Tim Pengembang:</p>
                <ul className="text-sm opacity-60 space-y-1">
                  <li>825220147 - Gerrant Enriqo Hiya</li>
                  <li>825220134 - Saoloan Natan Yoel Silalahi</li>
                  <li>825220153 - Amara Thuridha</li>
                  <li>825220114 - Daffa Imani Saputra</li>
                </ul>
              </div>
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
