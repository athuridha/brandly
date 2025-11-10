import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Palette, Code, Smartphone, TrendingUp, CheckCircle2, Star, Clock, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MobileCTA from "@/components/mobile-cta"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const services = [
    {
      icon: Code,
      title: "Website Profil",
      description: "Website profesional, cepat, dan responsif.",
    },
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Logo, warna, tipografi — identitas visual lengkap.",
    },
    {
      icon: Users,
      title: "Maintenance & Growth",
      description: "Perawatan rutin, optimasi SEO & peningkatan performa.",
    },
  ]
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-primary" />
              <span>Dipercaya 50+ Klien di Indonesia</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Wujudkan <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Brand Digital</span> Anda
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Kami membantu UKM, Freelancer, dan Startup membangun kehadiran digital yang kuat dengan website
              profesional dan strategi branding yang tepat.
            </p>
            {/* Mobile-only logo placed above CTA */}
            <div className="md:hidden mb-8">
              <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border border-border/50 rounded-3xl p-6 shadow-xl flex items-center justify-center">
                <Image
                  src="/brandly.png"
                  alt="Brandly logo"
                  width={420}
                  height={140}
                  className="w-full max-w-[360px] h-auto object-contain"
                  priority
                />
              </div>
            </div>
            {/* Quick benefits (mobile chips) */}
            <div className="md:hidden -mx-1 mb-6 flex items-center gap-2 overflow-x-auto">
              {[{icon: Smartphone, label: 'Mobile-first'}, {icon: Clock, label: 'Cepat'}, {icon: Users, label: 'Support 24/7'}, {icon: Zap, label: 'Modern UI'}].map((c, i) => (
                <span key={i} className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-foreground/80">
                  <c.icon className="w-3.5 h-3.5 text-primary" />{c.label}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                <a href="#contact">Konsultasi Gratis <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#portfolio">Lihat Portfolio</a>
              </Button>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-muted-foreground">Garansi Revisi</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-muted-foreground">Pengerjaan Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-muted-foreground">Support 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute -top-10 -right-10 size-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border border-border/50 rounded-3xl p-10 shadow-xl flex items-center justify-center relative">
              <Image
                src="/brandly.png"
                alt="Brandly logo"
                width={480}
                height={160}
                className="w-full max-w-[420px] h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              <span>Layanan Terbaik</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Layanan Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Solusi lengkap untuk kebutuhan digital Anda dengan standar kualitas terbaik</p>
          </div>
          {/* Mobile horizontal scroller */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-4 snap-x snap-mandatory">
              {services.map((service, idx) => (
                <Card key={idx} className="min-w-[260px] snap-start group p-6 text-center rounded-2xl border-border/50 hover:border-primary/40 bg-card/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 ring-1 ring-transparent hover:ring-primary/20">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full ring-1 ring-primary/20 bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary/40">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop/tablet grid */}
          <div className="hidden md:grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="group p-8 sm:p-10 text-center rounded-2xl border-border/50 hover:border-primary/40 bg-card/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 ring-1 ring-transparent hover:ring-primary/20"
              >
                <div className="mx-auto mb-5 w-14 h-14 rounded-full ring-1 ring-primary/20 bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary/40">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-5">
                  <a href="#pricing" className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Lihat paket <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-accent" />
            <span>Portfolio Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Hasil Karya Terbaik</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Website yang telah kami buat untuk klien kami</p>
        </div>
        <div className="rounded-2xl border border-dashed border-border/60 p-12 text-center bg-card/40">
          <p className="text-muted-foreground">Portfolio akan segera hadir.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Harga Terjangkau</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Paket Layanan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "5-10 Juta",
                description: "Cocok untuk bisnis baru",
                features: [
                  "Landing Page Modern",
                  "Logo & Brand Kit Dasar",
                  "Mobile Responsive",
                  "Basic SEO",
                  "1x Revisi Gratis",
                  "Durasi 2-3 Minggu",
                ],
                popular: false,
              },
              {
                name: "Growth",
                price: "10-20 Juta",
                description: "Untuk bisnis berkembang",
                features: [
                  "Multi-Page Website (5-8 halaman)",
                  "Brand Guideline Lengkap",
                  "Professional Copywriting",
                  "Google Analytics Setup",
                  "Unlimited Revisi (2 minggu)",
                  "1 Bulan Maintenance Gratis",
                ],
                popular: true,
              },
              {
                name: "Scale",
                price: "20+ Juta",
                description: "Solusi custom enterprise",
                features: [
                  "Website Fully Custom",
                  "Payment Gateway Integration",
                  "CRM/Database Integration",
                  "Advanced SEO & Performance",
                  "3 Bulan Maintenance",
                  "Priority Support 24/7",
                ],
                popular: false,
              },
            ].map((plan, idx) => (
              <Card key={idx} className={`group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-transparent hover:ring-primary/20 ${plan.popular ? 'border-2 border-primary scale-105 bg-primary/5' : 'border-border bg-card/80'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-primary/80 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                    POPULER
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-primary mb-1">Rp {plan.price}</div>
                  <p className="text-xs text-muted-foreground">per project</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.popular ? 'default' : 'outline'} asChild>
                  <a href="#contact">Pilih Paket</a>
                </Button>
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
            <Card key={idx} className="p-8 bg-primary/5 border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
          >
            <a href="mailto:gerranthiya@e-digital.space" aria-label="Hubungi kami via email">
              Hubungi Kami Sekarang
            </a>
          </Button>
        </div>
      </section>

  {/* Footer */}
  <MobileCTA />
  <Footer />
    </div>
  )
}

