import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { BookOpen, BarChart3, Target, Presentation } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Tugas Kuliah - Brandly",
  description: "Kumpulan tugas mata kuliah Kewirausahaan",
}

export default function TaskIndexPage() {
  const tasks = [
    {
      title: "Business Model Canvas",
      description: "Analisis model bisnis Brandly menggunakan framework Business Model Canvas",
      icon: BookOpen,
      href: "/task/business-model-canvas",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Business Planning",
      description: "Perencanaan bisnis lengkap meliputi SWOT, strategi, milestone, dan proyeksi",
      icon: BarChart3,
      href: "/task/business-planning",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Porter's Five Forces",
      description: "Analisis kompetitif industri jasa pembuatan website menggunakan Porter's Five Forces",
      icon: Target,
      href: "/task/porter-five-forces",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Presentasi Project",
      description: "Slide presentasi final project Brandly untuk mata kuliah",
      icon: Presentation,
      href: "/task/presentation",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
            Tugas Kewirausahaan
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Kumpulan dokumen analisis bisnis Brandly untuk tugas mata kuliah
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Tim Pengembang:</span>
            <span className="font-semibold text-foreground">825220147, 825220134, 825220153, 825220114</span>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tasks.map((task, idx) => (
            <Link key={idx} href={task.href}>
              <Card className="relative overflow-hidden p-8 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${task.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${task.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <task.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {task.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Lihat Selengkapnya</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3 text-foreground">Catatan</h3>
          <p className="text-muted-foreground">
            Halaman-halaman ini dibuat untuk memenuhi tugas mata kuliah Kewirausahaan. 
            Untuk informasi tentang layanan Brandly yang sebenarnya, silakan kunjungi <Link href="/" className="text-primary font-semibold hover:underline">halaman utama</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
