import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowDown, ArrowRight, ArrowLeft, ArrowUp } from "lucide-react"

export const metadata = {
  title: "Porter's Five Forces - Brandly",
  description:
    "Analisis Porter's Five Forces untuk bisnis jasa pembuatan website profil Brandly",
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/30 shadow-sm">
      {level}
    </span>
  )
}

export default function PorterFiveForcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
                Porter's Five Forces
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">Analisis kompetitif industri jasa pembuatan website</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Business:</span>
              <span className="text-sm md:text-base font-semibold text-foreground">Brandly — Jasa Website Profil</span>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full" />
        </div>

        {/* Canvas - 5 kotak (atas, kiri, tengah, kanan, bawah) */}
        <section aria-label="Porter's Five Forces diagram" className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_auto_auto_auto_auto] md:grid-rows-[auto_auto_auto] gap-6 md:gap-8">
            {/* Top center box */}
            <div className="col-start-1 md:col-start-2 row-start-1">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 group hover:scale-[1.02]">
                <div className="mb-2"><LevelBadge level="Moderate → High" /></div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Ancaman Pendatang Baru</h3>
                <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Alat open‑source & builder no‑code menurunkan hambatan masuk.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Supply freelancer banyak; onboarding cepat.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Namun trust/portfolio & SOP layanan butuh waktu → hambatan moderat.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Diferensiasi layanan sering mirip, komparasi mudah.</span></li>
                </ul>
                <ArrowDown strokeWidth={3} className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 text-primary drop-shadow-md" />
              </div>
            </div>

            {/* Middle left box */}
            <div className="col-start-1 row-start-2 md:row-start-2">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 h-full group hover:scale-[1.02]">
                <div className="mb-2"><LevelBadge level="Low" /></div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Daya Tawar Pemasok</h3>
                <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Banyak pilihan hosting (Vercel/Netlify/VPS) dan domain provider.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Framework & CMS saling substitusi; lock‑in rendah.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Harga kompetitif, mudah negosiasi dan berpindah pemasok.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Risiko ketergantungan minim untuk proyek website profil sederhana.</span></li>
                </ul>
                <ArrowRight strokeWidth={3} className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 w-7 h-7 text-primary drop-shadow-md" />
              </div>
            </div>

            {/* Middle center box (rivalry) */}
            <div className="col-start-1 md:col-start-2 row-start-3 md:row-start-2">
              <div className="relative bg-gradient-to-br from-primary/10 via-card to-card backdrop-blur border-2 border-primary/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 md:p-10 group hover:scale-[1.03]">
                <div className="mb-2"><LevelBadge level="High" /></div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Persaingan Kompetitif</h3>
                <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1 text-lg">•</span><span>Banyak studio kecil & freelancer → price war dan portofolio race.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1 text-lg">•</span><span>Kompetisi pada kecepatan delivery, kualitas UI/UX, dan SEO dasar.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1 text-lg">•</span><span>Switching cost klien rendah; retensi perlu program maintenance.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1 text-lg">•</span><span>Strategi: fokus niche vertikal, paket jelas, SLA & support purna jual.</span></li>
                </ul>
              </div>
            </div>

            {/* Middle right box */}
            <div className="col-start-1 md:col-start-3 row-start-4 md:row-start-2">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 h-full group hover:scale-[1.02]">
                <div className="mb-2"><LevelBadge level="High" /></div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Daya Tawar Pembeli</h3>
                <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Banyak alternatif penyedia; mudah membandingkan harga & portofolio.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Biaya pindah rendah (migrasi data/hosting relatif mudah).</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Price‑sensitive pada segmen UKM & freelancer.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Counter: paket transparan, jaminan revisi, studi kasus & testimoni.</span></li>
                </ul>
                <ArrowLeft strokeWidth={3} className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 w-7 h-7 text-primary drop-shadow-md" />
              </div>
            </div>

            {/* Bottom center box */}
            <div className="col-start-1 md:col-start-2 row-start-5 md:row-start-3">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 group hover:scale-[1.02]">
                <div className="mb-2"><LevelBadge level="Moderate" /></div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Ancaman Produk Substitusi</h3>
                <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Website builder & template siap pakai menggantikan kebutuhan dasar.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Profil di platform (Google Business, LinkedIn, Linktree) sebagai alternatif.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Marketplace freelancer/ghost theme dengan biaya rendah.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Mitigasi: custom UX, integrasi spesifik bisnis, performa, SEO & aksesibilitas.</span></li>
                </ul>
                <ArrowUp strokeWidth={3} className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 text-primary drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Footer strip under canvas */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 text-xs md:text-sm text-muted-foreground px-4">
            <span className="font-medium">Brand: <span className="text-foreground">Brandly — Jasa Website Profil</span></span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          
          {/* Strategi inti yang langsung menanggapi lima kekuatan */}
          <div className="mt-10 bg-gradient-to-br from-primary/5 via-card to-card backdrop-blur border border-primary/20 rounded-2xl shadow-lg p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <h4 className="text-xl md:text-2xl font-bold text-foreground">Catatan Strategi Inti</h4>
            </div>
            <ul className="text-sm md:text-base text-muted-foreground space-y-3 list-none pl-0">
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <span className="text-primary mt-1 text-lg font-bold">→</span>
                <span><strong className="text-foreground">Productized service:</strong> paket Starter/Growth/Scale dengan scope dan SLA jelas.</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <span className="text-primary mt-1 text-lg font-bold">→</span>
                <span><strong className="text-foreground">Diferensiasi:</strong> niche vertikal (UMKM jasa lokal), desain premium, SEO & performa sebagai standar.</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <span className="text-primary mt-1 text-lg font-bold">→</span>
                <span><strong className="text-foreground">Retention:</strong> maintenance bulanan, knowledge base, dan response time terukur.</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <span className="text-primary mt-1 text-lg font-bold">→</span>
                <span><strong className="text-foreground">Go‑to‑market:</strong> studi kasus, testimoni, referral program, dan partnership komunitas.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
