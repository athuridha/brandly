import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Palette, Code, Smartphone, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

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
      <Footer />
    </div>
  )
}
