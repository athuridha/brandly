"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LogOut, Package, Search, Trash2, Eye, Download, TrendingUp, Clock, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { supabase, type Order } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdminDashboard() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check auth
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
        if (!isLoggedIn) {
            router.push("/admin/login")
            return
        }

        // Load orders from Supabase
        loadOrders()

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('orders_changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('Change received!', payload)
                    loadOrders() // Reload orders on any change
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    const loadOrders = async () => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setOrders(data || [])
        } catch (error) {
            console.error('Error loading orders:', error)
            toast.error('Gagal memuat data pesanan')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn")
        localStorage.removeItem("adminUsername")
        router.push("/admin/login")
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus pesanan ini?")) return

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id)

            if (error) throw error

            toast.success('Pesanan berhasil dihapus')
            loadOrders()
        } catch (error) {
            console.error('Error deleting order:', error)
            toast.error('Gagal menghapus pesanan')
        }
    }

    const handleStatusChange = async (id: string, newStatus: "pending" | "contacted" | "completed") => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error

            toast.success('Status berhasil diupdate')
            loadOrders()
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Gagal mengupdate status')
        }
    }

    const handleViewDetail = (order: Order) => {
        setSelectedOrder(order)
        setIsDetailOpen(true)
    }

    const handleExportCSV = () => {
        const headers = ["ID", "Tanggal", "Nama", "Email", "WhatsApp", "Perusahaan", "Layanan", "Budget", "Timeline", "Status"]
        const csvData = orders.map(order => [
            order.id,
            new Date(order.created_at).toLocaleDateString("id-ID"),
            order.name,
            order.email,
            order.whatsapp,
            order.company,
            order.service,
            order.budget,
            order.timeline,
            order.status
        ])

        const csv = [
            headers.join(","),
            ...csvData.map(row => row.join(","))
        ].join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        toast.success('Data berhasil diexport')
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Statistics
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === "pending").length,
        contacted: orders.filter(o => o.status === "contacted").length,
        completed: orders.filter(o => o.status === "completed").length,
    }

    const getBudgetLabel = (budget: string) => {
        switch (budget) {
            case "small": return "Rp 5-10 Juta"
            case "medium": return "Rp 10-20 Juta"
            case "large": return "Rp 20+ Juta"
            default: return budget
        }
    }

    const getServiceLabel = (service: string) => {
        switch (service) {
            case "website": return "Website Development"
            case "branding": return "Brand Identity"
            case "maintenance": return "Maintenance & SEO"
            case "custom": return "Custom Solution"
            default: return service
        }
    }

    const getTimelineLabel = (timeline: string) => {
        switch (timeline) {
            case "urgent": return "Urgent (< 1 Bulan)"
            case "normal": return "Normal (1-2 Bulan)"
            case "relaxed": return "Santai (> 2 Bulan)"
            default: return timeline
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Package className="w-6 h-6 text-primary" />
                        <span>Brandly Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={loadOrders} title="Refresh">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <LogOut className="w-4 h-4 mr-2" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Pesanan</p>
                                <p className="text-3xl font-bold">{stats.total}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-blue-500" />
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                                <p className="text-3xl font-bold">{stats.pending}</p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-yellow-500" />
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Dihubungi</p>
                                <p className="text-3xl font-bold">{stats.contacted}</p>
                            </div>
                            <Clock className="w-8 h-8 text-purple-500" />
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Selesai</p>
                                <p className="text-3xl font-bold">{stats.completed}</p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                    </Card>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Daftar Pesanan</h1>
                        <p className="text-muted-foreground">Kelola pesanan masuk dari klien.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari pesanan..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Dihubungi</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Orders Table */}
                <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Klien</TableHead>
                                    <TableHead>Layanan</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Timeline</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <div className="flex items-center justify-center gap-2">
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Memuat data...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            {searchTerm || statusFilter !== "all" ? "Tidak ada pesanan yang sesuai filter." : "Belum ada pesanan masuk."}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {new Date(order.created_at).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{order.name}</div>
                                                <div className="text-xs text-muted-foreground">{order.company}</div>
                                                <div className="text-xs text-muted-foreground">{order.whatsapp}</div>
                                            </TableCell>
                                            <TableCell className="capitalize">{getServiceLabel(order.service)}</TableCell>
                                            <TableCell>{getBudgetLabel(order.budget)}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.timeline === 'urgent' ? 'bg-red-500/10 text-red-500' : 'bg-secondary text-secondary-foreground'
                                                    }`}>
                                                    {order.timeline}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={order.status}
                                                    onValueChange={(value) => handleStatusChange(order.id, value as "pending" | "contacted" | "completed")}
                                                >
                                                    <SelectTrigger className="w-[130px] h-8">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                                                Pending
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="contacted">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                                Dihubungi
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="completed">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                                Selesai
                                                            </span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleViewDetail(order)} className="text-muted-foreground hover:text-primary">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)} className="text-muted-foreground hover:text-destructive">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </main>

            {/* Detail Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Pesanan</DialogTitle>
                        <DialogDescription>
                            Informasi lengkap pesanan dari klien
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">ID Pesanan</p>
                                    <p className="font-mono text-xs">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
                                    <p>{new Date(selectedOrder.created_at).toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Informasi Klien</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Nama</p>
                                        <p>{selectedOrder.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="text-sm">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                                        <p>{selectedOrder.whatsapp}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Perusahaan</p>
                                        <p>{selectedOrder.company}</p>
                                    </div>
                                    {selectedOrder.website && (
                                        <div className="col-span-2">
                                            <p className="text-sm font-medium text-muted-foreground">Website Saat Ini</p>
                                            <a href={selectedOrder.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                                {selectedOrder.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Detail Project</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Layanan</p>
                                        <p>{getServiceLabel(selectedOrder.service)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Budget</p>
                                        <p>{getBudgetLabel(selectedOrder.budget)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                                        <p>{getTimelineLabel(selectedOrder.timeline)}</p>
                                    </div>
                                    {selectedOrder.payment_method && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Metode Pembayaran</p>
                                            <p className="capitalize">{selectedOrder.payment_method}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {selectedOrder.message && (
                                <div className="border-t pt-4">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Pesan dari Klien</p>
                                    <p className="text-sm bg-secondary/50 p-3 rounded-lg">{selectedOrder.message}</p>
                                </div>
                            )}
                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Status Pesanan</p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${selectedOrder.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                            selectedOrder.status === 'contacted' ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-green-500/10 text-green-500'
                                            }`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            window.open(`https://wa.me/${selectedOrder.whatsapp.replace(/^0/, '62')}?text=Halo ${selectedOrder.name}, terima kasih telah memesan layanan Brandly!`, '_blank')
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Hubungi via WhatsApp
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
