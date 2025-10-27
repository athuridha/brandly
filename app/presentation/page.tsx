import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PresentationPage() {
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
      <Footer />
    </div>
  )
}
