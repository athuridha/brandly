import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function PresentationPage() {
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
            <Link href="/presentation" className="text-foreground hover:text-primary transition font-semibold">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Week 13-15: Presentasi Project (Prototype)</h1>
          <p className="text-lg opacity-90">Prototype dan presentasi hasil pengembangan Brandly</p>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Sedang dalam Pengembangan</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Halaman presentasi project ini sedang dalam tahap pengembangan. Kami sedang menyiapkan prototype dan
                materi presentasi untuk menampilkan hasil kerja tim Brandly dalam mengembangkan solusi website dan
                branding yang inovatif.
              </p>
              <p className="text-muted-foreground mb-8">
                Silakan kembali ke halaman utama atau lihat Business Model Canvas kami untuk informasi lebih lanjut
                tentang strategi bisnis Brandly.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/">Kembali ke Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/business-model-canvas">Lihat Business Model Canvas</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 mt-20">
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
