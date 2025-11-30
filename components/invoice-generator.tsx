"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Download, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Order } from "@/lib/supabase"
import { toast } from "sonner"

interface InvoiceGeneratorProps {
    order: Order
}

export function InvoiceGenerator({ order }: InvoiceGeneratorProps) {
    const [amount, setAmount] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`)
    const [dueDate, setDueDate] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const generateInvoice = () => {
        if (!amount || !dueDate) {
            toast.error("Mohon lengkapi jumlah dan tanggal jatuh tempo")
            return
        }

        setIsGenerating(true)
        try {
            const doc = new jsPDF()

            // Header
            doc.setFontSize(20)
            doc.text("INVOICE", 14, 20)

            doc.setFontSize(10)
            doc.text("Brandly Creative Agency", 14, 30)
            doc.text("Jakarta, Indonesia", 14, 35)
            doc.text("contact@brandly.com", 14, 40)

            // Invoice Details
            doc.text(`Invoice No: ${invoiceNumber}`, 140, 30)
            doc.text(`Date: ${new Date().toLocaleDateString('id-ID')}`, 140, 35)
            doc.text(`Due Date: ${new Date(dueDate).toLocaleDateString('id-ID')}`, 140, 40)

            // Bill To
            doc.text("Bill To:", 14, 55)
            doc.setFontSize(12)
            doc.text(order.company, 14, 62)
            doc.setFontSize(10)
            doc.text(order.name, 14, 68)
            doc.text(order.email, 14, 73)

            // Items Table
            autoTable(doc, {
                startY: 85,
                head: [['Description', 'Service Type', 'Amount']],
                body: [
                    [
                        `Professional Services for ${order.service} project`,
                        order.service.toUpperCase(),
                        `Rp ${parseInt(amount).toLocaleString('id-ID')}`
                    ]
                ],
            })

            // Total
            const finalY = (doc as any).lastAutoTable.finalY || 100
            doc.setFontSize(12)
            doc.text(`Total Amount: Rp ${parseInt(amount).toLocaleString('id-ID')}`, 140, finalY + 20)

            // Footer
            doc.setFontSize(10)
            doc.text("Thank you for your business!", 14, finalY + 40)
            doc.text("Please transfer to: BCA 1234567890 a.n Brandly", 14, finalY + 45)

            doc.save(`Invoice-${invoiceNumber}.pdf`)
            toast.success("Invoice berhasil dibuat")
        } catch (error) {
            console.error(error)
            toast.error("Gagal membuat invoice")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Buat Invoice
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Nomor Invoice</Label>
                        <Input
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Jumlah Tagihan (Rp)</Label>
                        <Input
                            type="number"
                            placeholder="Contoh: 15000000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Jatuh Tempo</Label>
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <Button onClick={generateInvoice} disabled={isGenerating} className="w-full">
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
