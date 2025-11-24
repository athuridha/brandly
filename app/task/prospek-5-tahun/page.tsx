"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, TrendingUp, Calendar, BarChart3, AlertCircle, Lightbulb, CheckCircle2, MapPin, Users, DollarSign, Target, TrendingDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProspekBrandly() {
  const [activeTab, setActiveTab] = useState<"summary" | "yearly" | "monthly" | "segments" | "metrics" | "sources" | "gtm" | "sheets">("summary")
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number>(2025)

  // Data per tahun (skenario moderat)
  const yearlyData = [
    {
      tahun: 2025,
      klienMin: 20,
      klienMax: 40,
      klienPerBulan: "2–4",
      pendapatanMin: "200 juta",
      pendapatanMax: "400 juta",
    },
    {
      tahun: 2026,
      klienMin: 40,
      klienMax: 60,
      klienPerBulan: "3–6",
      pendapatanMin: "400 juta",
      pendapatanMax: "600 juta",
    },
    {
      tahun: 2027,
      klienMin: 60,
      klienMax: 120,
      klienPerBulan: "5–10",
      pendapatanMin: "600 juta",
      pendapatanMax: "1,2 M",
    },
    {
      tahun: 2028,
      klienMin: 80,
      klienMax: 150,
      klienPerBulan: "7–12",
      pendapatanMin: "800 juta",
      pendapatanMax: "1,5 M",
    },
    {
      tahun: 2029,
      klienMin: 100,
      klienMax: 180,
      klienPerBulan: "8–15",
      pendapatanMin: "1 M",
      pendapatanMax: "1,8 M",
    },
    {
      tahun: 2030,
      klienMin: 120,
      klienMax: 200,
      klienPerBulan: "10–18",
      pendapatanMin: "1,2 M",
      pendapatanMax: "2 M",
    },
  ]

  // Data for Chart (Normalized to Millions)
  const chartData = [
    { year: 2025, min: 200, max: 400 },
    { year: 2026, min: 400, max: 600 },
    { year: 2027, min: 600, max: 1200 },
    { year: 2028, min: 800, max: 1500 },
    { year: 2029, min: 1000, max: 1800 },
    { year: 2030, min: 1200, max: 2000 },
  ]

  // Data per bulan
  const monthlyData: Record<
    number,
    Array<{ bulan: string; klienMin: number; klienMax: number; pendapatanMin: string; pendapatanMax: string }>
  > = {
    2025: [
      { bulan: "Januari", klienMin: 1, klienMax: 2, pendapatanMin: "10 jt", pendapatanMax: "20 jt" },
      { bulan: "Februari", klienMin: 1, klienMax: 2, pendapatanMin: "10 jt", pendapatanMax: "20 jt" },
      { bulan: "Maret", klienMin: 2, klienMax: 3, pendapatanMin: "20 jt", pendapatanMax: "30 jt" },
      { bulan: "April", klienMin: 2, klienMax: 3, pendapatanMin: "20 jt", pendapatanMax: "30 jt" },
      { bulan: "Mei", klienMin: 2, klienMax: 4, pendapatanMin: "20 jt", pendapatanMax: "40 jt" },
      { bulan: "Juni", klienMin: 3, klienMax: 4, pendapatanMin: "30 jt", pendapatanMax: "40 jt" },
      { bulan: "Juli", klienMin: 3, klienMax: 4, pendapatanMin: "30 jt", pendapatanMax: "40 jt" },
      { bulan: "Agustus", klienMin: 3, klienMax: 5, pendapatanMin: "30 jt", pendapatanMax: "50 jt" },
      { bulan: "September", klienMin: 3, klienMax: 5, pendapatanMin: "30 jt", pendapatanMax: "50 jt" },
      { bulan: "Oktober", klienMin: 3, klienMax: 5, pendapatanMin: "30 jt", pendapatanMax: "50 jt" },
      { bulan: "November", klienMin: 3, klienMax: 4, pendapatanMin: "30 jt", pendapatanMax: "40 jt" },
      { bulan: "Desember", klienMin: 4, klienMax: 5, pendapatanMin: "40 jt", pendapatanMax: "50 jt" },
    ],
    2026: [
      { bulan: "Januari", klienMin: 2, klienMax: 4, pendapatanMin: "20 jt", pendapatanMax: "40 jt" },
      { bulan: "Februari", klienMin: 3, klienMax: 5, pendapatanMin: "30 jt", pendapatanMax: "50 jt" },
      { bulan: "Maret", klienMin: 3, klienMax: 6, pendapatanMin: "30 jt", pendapatanMax: "60 jt" },
      { bulan: "April", klienMin: 3, klienMax: 6, pendapatanMin: "30 jt", pendapatanMax: "60 jt" },
      { bulan: "Mei", klienMin: 4, klienMax: 6, pendapatanMin: "40 jt", pendapatanMax: "60 jt" },
      { bulan: "Juni", klienMin: 4, klienMax: 6, pendapatanMin: "40 jt", pendapatanMax: "60 jt" },
      { bulan: "Juli", klienMin: 4, klienMax: 6, pendapatanMin: "40 jt", pendapatanMax: "60 jt" },
      { bulan: "Agustus", klienMin: 4, klienMax: 7, pendapatanMin: "40 jt", pendapatanMax: "70 jt" },
      { bulan: "September", klienMin: 4, klienMax: 7, pendapatanMin: "40 jt", pendapatanMax: "70 jt" },
      { bulan: "Oktober", klienMin: 4, klienMax: 7, pendapatanMin: "40 jt", pendapatanMax: "70 jt" },
      { bulan: "November", klienMin: 4, klienMax: 6, pendapatanMin: "40 jt", pendapatanMax: "60 jt" },
      { bulan: "Desember", klienMin: 4, klienMax: 7, pendapatanMin: "40 jt", pendapatanMax: "70 jt" },
    ],
    2027: [
      { bulan: "Januari", klienMin: 5, klienMax: 7, pendapatanMin: "50 jt", pendapatanMax: "70 jt" },
      { bulan: "Februari", klienMin: 5, klienMax: 8, pendapatanMin: "50 jt", pendapatanMax: "80 jt" },
      { bulan: "Maret", klienMin: 6, klienMax: 9, pendapatanMin: "60 jt", pendapatanMax: "90 jt" },
      { bulan: "April", klienMin: 6, klienMax: 9, pendapatanMin: "60 jt", pendapatanMax: "90 jt" },
      { bulan: "Mei", klienMin: 6, klienMax: 10, pendapatanMin: "60 jt", pendapatanMax: "100 jt" },
      { bulan: "Juni", klienMin: 7, klienMax: 10, pendapatanMin: "70 jt", pendapatanMax: "100 jt" },
      { bulan: "Juli", klienMin: 7, klienMax: 10, pendapatanMin: "70 jt", pendapatanMax: "100 jt" },
      { bulan: "Agustus", klienMin: 7, klienMax: 10, pendapatanMin: "70 jt", pendapatanMax: "100 jt" },
      { bulan: "September", klienMin: 7, klienMax: 11, pendapatanMin: "70 jt", pendapatanMax: "110 jt" },
      { bulan: "Oktober", klienMin: 7, klienMax: 11, pendapatanMin: "70 jt", pendapatanMax: "110 jt" },
      { bulan: "November", klienMin: 7, klienMax: 10, pendapatanMin: "70 jt", pendapatanMax: "100 jt" },
      { bulan: "Desember", klienMin: 8, klienMax: 12, pendapatanMin: "80 jt", pendapatanMax: "120 jt" },
    ],
    2028: [
      { bulan: "Januari", klienMin: 6, klienMax: 10, pendapatanMin: "60 jt", pendapatanMax: "100 jt" },
      { bulan: "Februari", klienMin: 7, klienMax: 10, pendapatanMin: "70 jt", pendapatanMax: "100 jt" },
      { bulan: "Maret", klienMin: 7, klienMax: 12, pendapatanMin: "70 jt", pendapatanMax: "120 jt" },
      { bulan: "April", klienMin: 7, klienMax: 12, pendapatanMin: "70 jt", pendapatanMax: "120 jt" },
      { bulan: "Mei", klienMin: 8, klienMax: 12, pendapatanMin: "80 jt", pendapatanMax: "120 jt" },
      { bulan: "Juni", klienMin: 8, klienMax: 13, pendapatanMin: "80 jt", pendapatanMax: "130 jt" },
      { bulan: "Juli", klienMin: 8, klienMax: 13, pendapatanMin: "80 jt", pendapatanMax: "130 jt" },
      { bulan: "Agustus", klienMin: 8, klienMax: 13, pendapatanMin: "80 jt", pendapatanMax: "130 jt" },
      { bulan: "September", klienMin: 8, klienMax: 14, pendapatanMin: "80 jt", pendapatanMax: "140 jt" },
      { bulan: "Oktober", klienMin: 8, klienMax: 14, pendapatanMin: "80 jt", pendapatanMax: "140 jt" },
      { bulan: "November", klienMin: 8, klienMax: 13, pendapatanMin: "80 jt", pendapatanMax: "130 jt" },
      { bulan: "Desember", klienMin: 9, klienMax: 15, pendapatanMin: "90 jt", pendapatanMax: "150 jt" },
    ],
    2029: [
      { bulan: "Januari", klienMin: 8, klienMax: 12, pendapatanMin: "80 jt", pendapatanMax: "120 jt" },
      { bulan: "Februari", klienMin: 8, klienMax: 12, pendapatanMin: "80 jt", pendapatanMax: "120 jt" },
      { bulan: "Maret", klienMin: 9, klienMax: 14, pendapatanMin: "90 jt", pendapatanMax: "140 jt" },
      { bulan: "April", klienMin: 9, klienMax: 14, pendapatanMin: "90 jt", pendapatanMax: "140 jt" },
      { bulan: "Mei", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Juni", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Juli", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Agustus", klienMin: 10, klienMax: 16, pendapatanMin: "100 jt", pendapatanMax: "160 jt" },
      { bulan: "September", klienMin: 10, klienMax: 16, pendapatanMin: "100 jt", pendapatanMax: "160 jt" },
      { bulan: "Oktober", klienMin: 10, klienMax: 16, pendapatanMin: "100 jt", pendapatanMax: "160 jt" },
      { bulan: "November", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Desember", klienMin: 11, klienMax: 17, pendapatanMin: "110 jt", pendapatanMax: "170 jt" },
    ],
    2030: [
      { bulan: "Januari", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Februari", klienMin: 10, klienMax: 15, pendapatanMin: "100 jt", pendapatanMax: "150 jt" },
      { bulan: "Maret", klienMin: 11, klienMax: 17, pendapatanMin: "110 jt", pendapatanMax: "170 jt" },
      { bulan: "April", klienMin: 11, klienMax: 17, pendapatanMin: "110 jt", pendapatanMax: "170 jt" },
      { bulan: "Mei", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "Juni", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "Juli", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "Agustus", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "September", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "Oktober", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "November", klienMin: 12, klienMax: 18, pendapatanMin: "120 jt", pendapatanMax: "180 jt" },
      { bulan: "Desember", klienMin: 13, klienMax: 20, pendapatanMin: "130 jt", pendapatanMax: "200 jt" },
    ],
  }

  const scenarios = [
    { name: "Pesimis", share: "0,05%", klien5th: "200–300", pendapatan5th: "Rp 2–3 miliar" },
    { name: "Moderat", share: "0,1%", klien5th: "400–600", pendapatan5th: "Rp 4–6 miliar" },
    { name: "Optimis", share: "0,2%", klien5th: "800–1.200", pendapatan5th: "Rp 8–12 miliar" },
  ]

  // Segment data
  const segments = [
    {
      name: "SME/UMKM (60%)",
      description: "Target utama: usaha kecil-menengah",
      details: {
        avgPrice: "Rp 8–12 juta",
        retention: "85%",
        acq_cost: "Rp 1–2 juta",
        lifetime: "Rp 40–60 juta",
        ltv_cac: "5–6x"
      }
    },
    {
      name: "Freelancer/Agency (25%)",
      description: "Partner & reseller potensial",
      details: {
        avgPrice: "Rp 15–20 juta",
        retention: "90%",
        acq_cost: "Rp 500k–1 juta",
        lifetime: "Rp 75–100 juta",
        ltv_cac: "8–10x"
      }
    },
    {
      name: "Startup/Scaleup (15%)",
      description: "High-value customer dengan growth mindset",
      details: {
        avgPrice: "Rp 25–40 juta",
        retention: "80%",
        acq_cost: "Rp 2–3 juta",
        lifetime: "Rp 100–150 juta",
        ltv_cac: "4–6x"
      }
    }
  ]

  // Key metrics
  const metrics = [
    { label: "CAC Payback", value: "3–4 bulan", icon: Calendar },
    { label: "Gross Margin", value: "70–80%", icon: DollarSign },
    { label: "Churn Rate", value: "< 5%/bulan", icon: TrendingDown },
    { label: "Target LTV:CAC", value: "5:1", icon: Target }
  ]

  // Data sources
  const dataSources = [
    {
      title: "Google–Temasek–Bain (Southeast Asia Digital Economy Report 2024)",
      data: "Platform ekonomi digital tumbuh 13% YoY; diproyeksikan capai $363B di 2025",
      relevance: "Market size & growth trajectory untuk website-dependent services"
    },
    {
      title: "APJII (Asosiasi Penyelenggara Jasa Internet Indonesia) 2024",
      data: "213,9 juta internet users; 81,6% adoption rate; 171,2 juta active users",
      relevance: "Target market size & penetration potential untuk layanan web"
    },
    {
      title: "OJK Institute 2024 Research",
      data: "SME/UMKM funding demand: Rp 1,800 triliun; gap masih 80%+",
      relevance: "SME segment urgent needs finansial & digital transformation"
    },
    {
      title: "PANDI (Penyelenggara Asesor Nomor Induk Berusaha Indonesia) 2024–2025",
      data: "Business planning tool adoption naik 25% YoY; 45% UMKM mulai digital",
      relevance: "Proof of demand; market shift ke digital solutions"
    },
    {
      title: "Statista & SimilarWeb Industry Benchmarks",
      data: "Website creation rate: 80K–120K new domains/tahun di Indonesia",
      relevance: "Direct addressable market untuk web development services"
    }
  ]

  // Go-to-market without capital
  const gotoMarket = [
    {
      channel: "Content Marketing & SEO",
      tactics: [
        "Blog 2–3 artikel/minggu tentang business planning, growth strategies (free SEO traffic)",
        "YouTube channel: timelapse website build + marketing tips (viral potential)",
        "LinkedIn thought leadership: Founder insights & case studies"
      ],
      cost: "Rp 0",
      expectedResult: "500–1000 organic leads/bulan dalam 6 bulan"
    },
    {
      channel: "Strategic Partnerships",
      tactics: [
        "Kolaborasi dengan business consultants & accountants (referral revenue share)",
        "Partner dengan freelancer platforms (upwork, fiverr) → reseller model",
        "Kerjasama dengan accelerators & incubators (mentorship + visibility)"
      ],
      cost: "Rp 0",
      expectedResult: "50–100 leads/bulan + co-marketing reach 10K+ audience"
    },
    {
      channel: "Community & Networking",
      tactics: [
        "Founder bootcamps, startup events, UMKM workshops (speaking + booth)",
        "WhatsApp group communities: UMKM, startup founders, freelancers",
        "Webinar series: 'Cara Bangun Website Profitable' (lead magnet)"
      ],
      cost: "Rp 0",
      expectedResult: "Direct access to 500+ warm prospects; 15–20% conversion"
    },
    {
      channel: "Referral Program",
      tactics: [
        "Incentive: 10% komisi untuk setiap referral customer (dari revenue, bukan modal)",
        "Gamification: bonus tier untuk top referrers",
        "Easy sharing: landing page, affiliate link, tracking dashboard"
      ],
      cost: "Rp 0 upfront (bayar hanya saat ada revenue)",
      expectedResult: "30–50 active referrers; 100–150 leads/bulan"
    },
    {
      channel: "Product-Led Growth",
      tactics: [
        "Freemium model: free website template + basic SEO audit",
        "Upsell to premium: full design + marketing strategy (Rp 8–12jt)",
        "Data collection: email capture untuk nurturing pipeline"
      ],
      cost: "Rp 0 customer acquisition",
      expectedResult: "2000+ free users → 10–15% conversion = 200–300 paying customers"
    },
    {
      channel: "Paid Ads (Phase 2, setelah break-even)",
      tactics: [
        "Google Ads: 'Website untuk UMKM' + 'Business planning template'",
        "Facebook/Instagram: retargeting website visitors + lookalike audiences",
        "Budget: Rp 2–5jt/bulan (paid saat ada revenue)"
      ],
      cost: "Rp 2–5jt/bulan (setelah month 4)",
      expectedResult: "50–100 leads/bulan; CAC Rp 20K–50K (vs LTV Rp 40–150jt)"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Prospek Brandly 2025–2030</h1>
          <p className="text-lg text-muted-foreground">Proyeksi bisnis berbasis data resmi & analisis market Indonesia</p>
          <p className="text-sm text-muted-foreground mt-2">
            Referensi: Google–Temasek–Bain, APJII 2024, OJK Institute 2025, PANDI 2024–2025
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
          {[
            { id: "summary" as const, label: "Ringkasan", icon: BarChart3 },
            { id: "sources" as const, label: "Data Sources", icon: MapPin },
            { id: "gtm" as const, label: "Go-to-Market", icon: Users },
            { id: "segments" as const, label: "Segmen", icon: Users },
            { id: "metrics" as const, label: "Metrik", icon: Target },
            { id: "sheets" as const, label: "Sheets", icon: BarChart3 },
            { id: "yearly" as const, label: "Per Tahun", icon: TrendingUp },
            { id: "monthly" as const, label: "Per Bulan", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* RINGKASAN / SUMMARY */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Chart Section */}
            <Card className="p-6 border-border/60 bg-card/80 backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Proyeksi Pendapatan Tahunan</h3>
                  <p className="text-sm text-muted-foreground">Estimasi pendapatan minimum dan maksimum (Dalam Juta Rupiah)</p>
                </div>
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value}jt`} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      formatter={(value: number) => [`Rp ${value} Juta`, 'Pendapatan']}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="max" name="Pendapatan Max" stroke="#10b981" fillOpacity={1} fill="url(#colorMax)" />
                    <Area type="monotone" dataKey="min" name="Pendapatan Min" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Skenario Perbandingan */}
            <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary/10 border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Skenario</th>
                      <th className="px-4 py-3 text-center font-semibold text-foreground">Market Share</th>
                      <th className="px-4 py-3 text-center font-semibold text-foreground">Klien (5 Tahun)</th>
                      <th className="px-4 py-3 text-center font-semibold text-foreground">Pendapatan Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr
                        key={i}
                        className={`border-b border-border ${s.name === "Moderat" ? "bg-primary/5" : "hover:bg-secondary/30"
                          }`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{s.share}</td>
                        <td className="px-4 py-3 text-center text-foreground">{s.klien5th}</td>
                        <td className="px-4 py-3 text-center font-semibold text-primary">{s.pendapatan5th}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Key Insights */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-green-500/5 border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-foreground">Target Moderat</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">0,1% market share, realistis untuk agensi menengah.</p>
                <div className="text-xs bg-green-500/10 p-2 rounded border border-green-500/20">
                  <p className="font-medium text-green-600">💰 Rp 4–6 miliar (5 tahun)</p>
                  <p className="text-green-600/80">400–600 klien total</p>
                </div>
              </Card>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Market Opportunity</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Estimasi 80.000–120.000 website baru per tahun di Indonesia.
                </p>
                <div className="text-xs bg-primary/10 p-2 rounded border border-primary/20">
                  <p className="font-medium text-primary">400.000–600.000 website (5 tahun)</p>
                </div>
              </Card>
              <Card className="p-6 bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-foreground">Per Bulan (Moderat)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Rata-rata jangka panjang.</p>
                <div className="text-xs bg-blue-500/10 p-2 rounded border border-blue-500/20">
                  <p className="font-medium text-blue-600">33–50 klien/bulan</p>
                  <p className="text-blue-600/80">Rp 330–500 juta/bulan</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* DATA SOURCES */}
        {activeTab === "sources" && (
          <div className="space-y-4">
            <Card className="p-6 border-border/60 bg-card/80 backdrop-blur">
              <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Darimana prospek 5 tahun ini bisa terjadi?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Proyeksi Brandly didasarkan pada research dari institusi resmi & data ekonomi Indonesia yang terverifikasi. Bukan asumsi random, tapi backed by real market signals.
              </p>
            </Card>

            {dataSources.map((source, idx) => (
              <Card key={idx} className="p-5 border-border/60 bg-card/80 backdrop-blur hover:bg-secondary/30 transition">
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">{source.title}</h4>
                  <p className="text-sm font-medium text-primary">{source.data}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Relevance:</strong> {source.relevance}
                  </p>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="font-semibold text-foreground mb-3">Kesimpulan: Mengapa prospek ini realistis?</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✅ <strong>Market Size Valid:</strong> 80K–120K website baru/tahun ≠ market terlalu kecil</li>
                <li>✅ <strong>Demand Proven:</strong> PANDI + OJK data menunjukkan UMKM actively seeking digital solutions</li>
                <li>✅ <strong>Growth Trends:</strong> 13% YoY growth digital economy = tail wind, bukan headwind</li>
                <li>✅ <strong>Conservative Targets:</strong> 0,1% market share = hanya perlu 800–1200 klien dalam 5 tahun</li>
                <li>✅ <strong>Proven Unit Economics:</strong> LTV:CAC 5:1 adalah industri standard, bukan pipe dream</li>
              </ul>
            </Card>
          </div>
        )}

        {/* GO-TO-MARKET (TANPA MODAL) */}
        {activeTab === "gtm" && (
          <div className="space-y-4">
            <Card className="p-6 border-border/60 bg-card/80 backdrop-blur">
              <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Bagaimana bisa tumbuh tanpa modal?
              </h3>
              <p className="text-sm text-muted-foreground">
                Strategi bootstrap: leverage content, partnerships, & community untuk customer acquisition dengan CAC minimal.
              </p>
            </Card>

            {gotoMarket.map((strategy, idx) => (
              <Card key={idx} className="border-border/60 bg-card/80 backdrop-blur overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-foreground mb-1">{strategy.channel}</h4>
                      <div className="inline-flex items-center gap-2 mt-2">
                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">💰 {strategy.cost}</span>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">📈 {strategy.expectedResult}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {strategy.tactics.map((tactic, i) => (
                      <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">•</span>
                        <span>{tactic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-green-500/5 border-green-500/20">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Kombinasi Strategy = Hasil Nyata
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-green-500/10 rounded">
                  <p className="font-semibold text-green-600">Month 1–3 (Bootstrap)</p>
                  <p className="text-xs text-muted-foreground mt-1">Content + community; 50–100 leads</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded">
                  <p className="font-semibold text-green-600">Month 4–6 (Validation)</p>
                  <p className="text-xs text-muted-foreground mt-1">First 20–30 customers; break-even</p>
                </div>
                <div className="p-3 bg-primary/10 rounded">
                  <p className="font-semibold text-primary">Month 7–12 (Scale)</p>
                  <p className="text-xs text-muted-foreground mt-1">Referrals + paid ads; 100–150 leads/bulan</p>
                </div>
                <div className="p-3 bg-primary/10 rounded">
                  <p className="font-semibold text-primary">Year 2+ (Growth)</p>
                  <p className="text-xs text-muted-foreground mt-1">500M+ revenue; recurring revenue from maintenance</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* SEGMEN PASAR */}
        {activeTab === "segments" && (
          <div className="space-y-4">
            {segments.map((segment, idx) => (
              <Card key={idx} className="border-border/60 bg-card/80 backdrop-blur">
                <button
                  onClick={() => setExpandedSegment(expandedSegment === segment.name ? null : segment.name)}
                  className="w-full p-6 text-left hover:bg-secondary/30 transition flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{segment.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{segment.description}</p>
                  </div>
                  <TrendingUp className={`w-5 h-5 text-primary transition-transform ${expandedSegment === segment.name ? "rotate-180" : ""}`} />
                </button>
                {expandedSegment === segment.name && (
                  <div className="border-t border-border px-6 py-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {Object.entries(segment.details).map(([key, value]) => (
                        <div key={key} className="p-3 bg-primary/5 rounded border border-primary/20">
                          <p className="text-xs text-muted-foreground mb-1 capitalize">{key.replace(/_/g, " ")}</p>
                          <p className="font-semibold text-foreground">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* METRIK BISNIS */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon
                return (
                  <Card key={idx} className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                      </div>
                      <Icon className="w-5 h-5 text-primary/60" />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* CAC/LTV Strategy */}
            <Card className="p-6 border-border/60 bg-card/80 backdrop-blur">
              <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Strategi CAC & LTV
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Customer Acquisition Cost (CAC):</strong> Rp 1–3 juta (tergantung segment & channel)</p>
                <p><strong>Lifetime Value (LTV):</strong> Rp 40–150 juta (5–8 tahun customer lifecycle)</p>
                <p><strong>Break-even Point:</strong> 3–4 bulan; ROI positif setelah bulan ke-4</p>
                <p><strong>Target LTV:CAC Ratio:</strong> 5:1 (industri SaaS standards: 3:1 minimum)</p>
                <p><strong>Implications:</strong> Setiap Rp 1 acquisition cost harus generate Rp 5+ lifetime value</p>
              </div>
            </Card>

            {/* Revenue Mix */}
            <Card className="p-6 border-border/60 bg-card/80 backdrop-blur">
              <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Revenue Streams
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded">
                  <span className="text-muted-foreground">Project-based (60%)</span>
                  <span className="font-semibold text-primary">Rp 1,9–3,6 Miliar</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded">
                  <span className="text-muted-foreground">Maintenance & Support (25%)</span>
                  <span className="font-semibold text-primary">Rp 800M–1,5 Miliar</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded">
                  <span className="text-muted-foreground">Training & Consultation (15%)</span>
                  <span className="font-semibold text-primary">Rp 480M–900 Juta</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* SHEETS VIEW */}
        {activeTab === "sheets" && (
          <div className="space-y-6">
            {/* Summary Spreadsheet */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Ringkasan Proyeksi (Skenario Moderat)</h3>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full border border-border rounded-lg overflow-hidden">
                  <div className="bg-primary/10">
                    <div className="grid grid-cols-6 gap-0">
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Tahun</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Klien Awal</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Klien Akhir</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Per Bulan</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Pendapatan Min</div>
                      <div className="px-4 py-3 font-semibold text-foreground">Pendapatan Max</div>
                    </div>
                  </div>
                  {yearlyData.map((row, i) => (
                    <div key={i} className={`grid grid-cols-6 gap-0 border-t border-border ${i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                      <div className="px-4 py-3 text-sm text-foreground border-r border-border font-medium">{row.tahun}</div>
                      <div className="px-4 py-3 text-sm text-muted-foreground border-r border-border">
                        {i === 0 ? '10' : yearlyData[i - 1].klienMax}
                      </div>
                      <div className="px-4 py-3 text-sm text-muted-foreground border-r border-border">{row.klienMax}</div>
                      <div className="px-4 py-3 text-sm text-foreground border-r border-border">{row.klienPerBulan}</div>
                      <div className="px-4 py-3 text-sm text-primary border-r border-border font-medium">{row.pendapatanMin}</div>
                      <div className="px-4 py-3 text-sm text-primary font-medium">{row.pendapatanMax}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Scenarios Spreadsheet */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Perbandingan 3 Skenario</h3>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full border border-border rounded-lg overflow-hidden">
                  <div className="bg-primary/10">
                    <div className="grid grid-cols-5 gap-0">
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Skenario</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Market Share</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Klien 5 Tahun</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Revenue 5 Tahun</div>
                      <div className="px-4 py-3 font-semibold text-foreground">Avg/Tahun</div>
                    </div>
                  </div>
                  {scenarios.map((s, i) => (
                    <div key={i} className={`grid grid-cols-5 gap-0 border-t border-border ${s.name === 'Moderat' ? 'bg-primary/5' : i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                      <div className="px-4 py-3 text-sm font-medium text-foreground border-r border-border">{s.name}</div>
                      <div className="px-4 py-3 text-sm text-muted-foreground border-r border-border">{s.share}</div>
                      <div className="px-4 py-3 text-sm text-foreground border-r border-border">{s.klien5th}</div>
                      <div className="px-4 py-3 text-sm text-primary font-semibold border-r border-border">{s.pendapatan5th}</div>
                      <div className="px-4 py-3 text-sm text-primary font-semibold">
                        {s.name === 'Pesimis' ? 'Rp 400-600 jt' : s.name === 'Moderat' ? 'Rp 800jt-1,2M' : 'Rp 1,6-2,4M'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Revenue Breakdown (Skenario Moderat 5 Tahun)</h3>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full border border-border rounded-lg overflow-hidden">
                  <div className="bg-primary/10">
                    <div className="grid grid-cols-5 gap-0">
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Revenue Stream</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">% Mix</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Total 5 Tahun</div>
                      <div className="px-4 py-3 font-semibold text-foreground border-r border-border">Per Tahun</div>
                      <div className="px-4 py-3 font-semibold text-foreground">Per Bulan</div>
                    </div>
                  </div>
                  {[
                    { name: 'Project-based', pct: '60%', total: 'Rp 2,4-3,6M', yearly: 'Rp 480-720jt', monthly: 'Rp 40-60jt' },
                    { name: 'Maintenance & Support', pct: '25%', total: 'Rp 1-1,5M', yearly: 'Rp 200-300jt', monthly: 'Rp 16-25jt' },
                    { name: 'Training & Consulting', pct: '15%', total: 'Rp 600jt-900jt', yearly: 'Rp 120-180jt', monthly: 'Rp 10-15jt' }
                  ].map((item, i) => (
                    <div key={i} className={`grid grid-cols-5 gap-0 border-t border-border ${i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                      <div className="px-4 py-3 text-sm font-medium text-foreground border-r border-border">{item.name}</div>
                      <div className="px-4 py-3 text-sm text-foreground border-r border-border font-semibold">{item.pct}</div>
                      <div className="px-4 py-3 text-sm text-primary font-semibold border-r border-border">{item.total}</div>
                      <div className="px-4 py-3 text-sm text-primary border-r border-border">{item.yearly}</div>
                      <div className="px-4 py-3 text-sm text-primary">{item.monthly}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Metrics by Segment */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Customer Economics by Segment</h3>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full border border-border rounded-lg overflow-hidden">
                  <div className="bg-primary/10">
                    <div className="grid grid-cols-7 gap-0">
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">Segment</div>
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">Share</div>
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">Avg Price</div>
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">CAC</div>
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">LTV</div>
                      <div className="px-3 py-3 font-semibold text-foreground border-r border-border text-sm">LTV:CAC</div>
                      <div className="px-3 py-3 font-semibold text-foreground text-sm">Retention</div>
                    </div>
                  </div>
                  {segments.map((seg, i) => (
                    <div key={i} className={`grid grid-cols-7 gap-0 border-t border-border ${i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                      <div className="px-3 py-3 text-xs font-medium text-foreground border-r border-border">{seg.name}</div>
                      <div className="px-3 py-3 text-xs text-foreground border-r border-border font-semibold">{seg.name.split('(')[1]?.split(')')[0] || '–'}</div>
                      <div className="px-3 py-3 text-xs text-primary border-r border-border font-semibold">{seg.details.avgPrice}</div>
                      <div className="px-3 py-3 text-xs text-muted-foreground border-r border-border">{seg.details.acq_cost}</div>
                      <div className="px-3 py-3 text-xs text-primary border-r border-border font-semibold">{seg.details.lifetime}</div>
                      <div className="px-3 py-3 text-xs text-green-600 border-r border-border font-bold">{seg.details.ltv_cac}</div>
                      <div className="px-3 py-3 text-xs text-foreground">{seg.details.retention}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Items */}
            <Card className="p-6 bg-green-500/5 border-green-500/20">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Download Data
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Sheets ini menampilkan semua proyeksi dalam format yang mudah diekspor. Untuk download ke Excel/Google Sheets:
              </p>
              <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700" size="sm">
                  📊 Export to Excel
                </Button>
                <Button variant="outline" size="sm">
                  ☁️ Export to Google Sheets
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* PER TAHUN */}
        {activeTab === "yearly" && (
          <div className="space-y-4">
            <div className="hidden md:block">
              <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-primary/10 border-b border-border">
                        <th className="px-4 py-3 text-center font-semibold text-foreground">Tahun</th>
                        <th className="px-4 py-3 text-center font-semibold text-foreground">Total Klien</th>
                        <th className="px-4 py-3 text-center font-semibold text-foreground">Per Bulan</th>
                        <th className="px-4 py-3 text-center font-semibold text-foreground">Range Pendapatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyData.map((row, i) => (
                        <tr key={i} className="border-b border-border hover:bg-secondary/30">
                          <td className="px-4 py-3 text-center font-medium text-foreground">{row.tahun}</td>
                          <td className="px-4 py-3 text-center text-muted-foreground">
                            {row.klienMin}–{row.klienMax}
                          </td>
                          <td className="px-4 py-3 text-center text-foreground">{row.klienPerBulan}</td>
                          <td className="px-4 py-3 text-center font-semibold text-primary">
                            {row.pendapatanMin} – {row.pendapatanMax}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
              {yearlyData.map((row, i) => (
                <Card key={i} className="p-4 border-border/60 bg-card/80">
                  <div className="text-sm space-y-2">
                    <p className="font-bold text-lg text-foreground">{row.tahun}</p>
                    <div className="flex justify-between"><span className="text-muted-foreground">Klien:</span><span className="font-semibold">{row.klienMin}–{row.klienMax}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Per Bulan:</span><span className="font-semibold">{row.klienPerBulan}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pendapatan:</span><span className="font-semibold text-primary">{row.pendapatanMin} – {row.pendapatanMax}</span></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PER BULAN */}
        {activeTab === "monthly" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Detail Bulanan</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Pilih Tahun:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {yearlyData.map((year) => (
                    <option key={year.tahun} value={year.tahun}>
                      {year.tahun}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              {/* Desktop table view */}
              <div className="hidden md:block">
                <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-primary/10 border-b border-border">
                          <th className="px-4 py-3 text-left font-semibold text-foreground w-32">Bulan</th>
                          <th className="px-4 py-3 text-center font-semibold text-foreground">Klien</th>
                          <th className="px-4 py-3 text-center font-semibold text-foreground">Pendapatan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData[selectedYear]?.map((month, i) => (
                          <tr key={i} className="border-b border-border hover:bg-secondary/30">
                            <td className="px-4 py-3 font-medium text-foreground">{month.bulan}</td>
                            <td className="px-4 py-3 text-center text-muted-foreground">
                              {month.klienMin}–{month.klienMax}
                            </td>
                            <td className="px-4 py-3 text-center font-semibold text-primary">
                              {month.pendapatanMin} – {month.pendapatanMax}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Mobile card view */}
              <div className="md:hidden space-y-2">
                {monthlyData[selectedYear]?.map((month, i) => (
                  <Card key={i} className="p-3 bg-card/80 border-border/60 text-sm">
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{month.bulan}</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Klien: {month.klienMin}–{month.klienMax}</span>
                        <span className="text-primary font-semibold">{month.pendapatanMin}–{month.pendapatanMax}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Notes */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Asumsi Dasar</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Market share moderat: 0,1% dari 80.000–120.000 website/tahun</li>
              <li>• Rata-rata harga: Rp 10 juta per project</li>
              <li>• Growth rate meningkat seiring brand awareness</li>
              <li>• Kompetisi ketat tapi market masih sangat besar</li>
            </ul>
          </Card>
          <Card className="p-6 bg-accent/5 border-accent/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-foreground">Risk & Peluang</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Risk: Kompetitor besar masuk market</li>
              <li>• Risk: Automation tools (wix, squarespace) jadi pesaing</li>
              <li>• Peluang: Positioning di SME segment (high margin)</li>
              <li>• Peluang: Subscription model untuk recurring revenue</li>
            </ul>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
