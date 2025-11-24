import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OrderForm from "@/components/order-form"
import OrderSummary from "@/components/order-summary"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function OrderPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Selesaikan Pesanan Anda</h1>
                        <p className="text-muted-foreground text-lg">
                            Lengkapi formulir di bawah ini untuk melanjutkan pemesanan paket layanan kami.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Benefits Sidebar */}
                        {/* Order Summary Sidebar */}
                        <div className="md:col-span-1 space-y-6">
                            <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-xl" />}>
                                <OrderSummary />
                            </Suspense>
                        </div>

                        {/* Order Form */}
                        <div className="md:col-span-2">
                            <Suspense fallback={<div className="text-center p-8">Loading form...</div>}>
                                <OrderForm />
                            </Suspense>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-8">Pertanyaan Umum (FAQ)</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Berapa lama proses pengerjaan website?</AccordionTrigger>
                                <AccordionContent>
                                    Waktu pengerjaan bervariasi tergantung kompleksitas project. Untuk paket Starter biasanya 2-3 minggu, sedangkan paket Growth dan Scale bisa memakan waktu 1-2 bulan.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Apakah saya perlu menyiapkan konten sendiri?</AccordionTrigger>
                                <AccordionContent>
                                    Idealnya ya, namun jika Anda belum memiliki konten, kami menyediakan jasa copywriting profesional (termasuk dalam paket Growth & Scale) untuk membantu menyusun konten website Anda.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Bagaimana sistem pembayarannya?</AccordionTrigger>
                                <AccordionContent>
                                    Kami menerapkan sistem DP (Down Payment) sebesar 50% di awal project, dan pelunasan 50% setelah website selesai dan siap dionlinekan.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Apakah ada garansi revisi?</AccordionTrigger>
                                <AccordionContent>
                                    Tentu! Kami memberikan garansi revisi sesuai paket yang dipilih. Kami ingin memastikan Anda benar-benar puas dengan hasil akhirnya.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
