"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
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
import {
    LogOut,
    Package,
    Search,
    Trash2,
    Eye,
    RefreshCw,
    Filter,
    X,
    MessageSquare,
    FileSpreadsheet,
    FileText,
    Printer,
    LayoutDashboard,
    List,
    History,
    Menu,
    Kanban,
    Moon,
    Sun,
    Bell,
    Send
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { supabase, type Order } from "@/lib/supabase"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { KanbanBoard } from "@/components/kanban-board"
import { InvoiceGenerator } from "@/components/invoice-generator"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OrderWithNotes extends Order {
    notes?: string
}

interface ActivityLog {
    id: string
    action: string
    details: string
    timestamp: string
    user: string
}

const WA_TEMPLATES = [
    { label: "Sapaan Awal", text: "Halo [Nama], terima kasih telah menghubungi Brandly. Saya melihat Anda tertarik dengan layanan [Layanan]. Boleh kita diskusikan lebih lanjut?" },
    { label: "Follow Up", text: "Halo [Nama], bagaimana kabar Anda? Apakah ada pertanyaan lebih lanjut mengenai penawaran kami sebelumnya?" },
    { label: "Konfirmasi Project", text: "Halo [Nama], kami siap memulai project [Layanan] Anda. Mohon konfirmasi ketersediaan waktu untuk kickoff meeting." },
    { label: "Tagihan", text: "Halo [Nama], berikut kami lampirkan invoice untuk project [Layanan]. Mohon segera diproses ya. Terima kasih!" }
]

export default function AdminDashboard() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [orders, setOrders] = useState<OrderWithNotes[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [serviceFilter, setServiceFilter] = useState<string>("all")
    const [timelineFilter, setTimelineFilter] = useState<string>("all")
    const [dateRange, setDateRange] = useState<string>("all")
    const [selectedOrder, setSelectedOrder] = useState<OrderWithNotes | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [orderNotes, setOrderNotes] = useState("")
    const [isAddingNote, setIsAddingNote] = useState(false)
    const [activeTab, setActiveTab] = useState<"orders" | "kanban" | "analytics" | "activity">("orders")
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
    const [notifications, setNotifications] = useState<string[]>([])

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
        if (!isLoggedIn) {
            router.push("/admin/login")
            return
        }

        loadOrders()
        loadActivityLogs()

        const subscription = supabase
            .channel('orders_changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('Change received!', payload)
                    loadOrders()
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    useEffect(() => {
        // Generate Smart Notifications
        const urgentPending = orders.filter(o => o.status === 'pending' && o.timeline === 'urgent').length
        const oldPending = orders.filter(o => {
            const days = Math.floor((new Date().getTime() - new Date(o.created_at).getTime()) / (1000 * 60 * 60 * 24))
            return o.status === 'pending' && days > 3
        }).length

        const newNotifs = []
        if (urgentPending > 0) newNotifs.push(`${urgentPending} pesanan URGENT masih pending!`)
        if (oldPending > 0) newNotifs.push(`${oldPending} pesanan pending lebih dari 3 hari.`)

        setNotifications(newNotifs)
    }, [orders])

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

    const loadActivityLogs = () => {
        const logs = JSON.parse(localStorage.getItem("adminActivityLogs") || "[]")
        setActivityLogs(logs)
    }

    const logActivity = (action: string, details: string) => {
        const newLog: ActivityLog = {
            id: Date.now().toString(),
            action,
            details,
            timestamp: new Date().toISOString(),
            user: localStorage.getItem("adminUsername") || "Admin"
        }
        const updatedLogs = [newLog, ...activityLogs].slice(0, 50) // Keep last 50 logs
        setActivityLogs(updatedLogs)
        localStorage.setItem("adminActivityLogs", JSON.stringify(updatedLogs))
    }

    const handleLogout = () => {
        logActivity("Logout", "Admin logged out")
        localStorage.removeItem("isAdminLoggedIn")
        localStorage.removeItem("adminUsername")
        router.push("/admin/login")
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus pesanan ini?")) return

        try {
            const orderToDelete = orders.find(o => o.id === id)
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id)

            if (error) throw error

            logActivity("Delete Order", `Deleted order from ${orderToDelete?.name}`)
            toast.success('Pesanan berhasil dihapus')
            loadOrders()
        } catch (error) {
            console.error('Error deleting order:', error)
            toast.error('Gagal menghapus pesanan')
        }
    }

    const handleBulkDelete = async () => {
        if (selectedOrders.length === 0) {
            toast.error('Pilih pesanan terlebih dahulu')
            return
        }

        if (!confirm(`Hapus ${selectedOrders.length} pesanan yang dipilih?`)) return

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .in('id', selectedOrders)

            if (error) throw error

            logActivity("Bulk Delete", `Deleted ${selectedOrders.length} orders`)
            toast.success(`${selectedOrders.length} pesanan berhasil dihapus`)
            setSelectedOrders([])
            loadOrders()
        } catch (error) {
            console.error('Error bulk deleting:', error)
            toast.error('Gagal menghapus pesanan')
        }
    }

    const handleBulkStatusUpdate = async (newStatus: "pending" | "contacted" | "completed") => {
        if (selectedOrders.length === 0) {
            toast.error('Pilih pesanan terlebih dahulu')
            return
        }

        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .in('id', selectedOrders)

            if (error) throw error

            logActivity("Bulk Status Update", `Updated ${selectedOrders.length} orders to ${newStatus}`)
            toast.success(`${selectedOrders.length} pesanan berhasil diupdate`)
            setSelectedOrders([])
            loadOrders()
        } catch (error) {
            console.error('Error bulk updating:', error)
            toast.error('Gagal mengupdate pesanan')
        }
    }

    const handleStatusChange = async (id: string, newStatus: "pending" | "contacted" | "completed") => {
        try {
            const order = orders.find(o => o.id === id)
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error

            logActivity("Status Update", `Updated order ${order?.name} to ${newStatus}`)
            toast.success('Status berhasil diupdate')
            loadOrders()
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Gagal mengupdate status')
        }
    }

    const handleViewDetail = (order: OrderWithNotes) => {
        setSelectedOrder(order)
        setOrderNotes(order.notes || "")
        setIsDetailOpen(true)
    }

    const handleSaveNotes = async () => {
        if (!selectedOrder) return

        setIsAddingNote(true)
        try {
            const { error } = await supabase
                .from('orders')
                .update({ notes: orderNotes })
                .eq('id', selectedOrder.id)

            if (error) throw error

            logActivity("Update Notes", `Updated notes for order ${selectedOrder.name}`)
            toast.success('Catatan berhasil disimpan')
            loadOrders()
            setSelectedOrder({ ...selectedOrder, notes: orderNotes })
        } catch (error) {
            console.error('Error saving notes:', error)
            toast.error('Gagal menyimpan catatan')
        } finally {
            setIsAddingNote(false)
        }
    }

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredOrders.map(order => ({
            ID: order.id,
            Date: new Date(order.created_at).toLocaleDateString("id-ID"),
            Name: order.name,
            Email: order.email,
            WhatsApp: order.whatsapp,
            Company: order.company,
            Service: order.service,
            Budget: order.budget,
            Timeline: order.timeline,
            Status: order.status,
            Notes: order.notes || ""
        })))
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders")
        XLSX.writeFile(workbook, `orders-${new Date().toISOString().split("T")[0]}.xlsx`)
        logActivity("Export Excel", "Exported orders to Excel")
        toast.success('Export Excel berhasil')
    }

    const handleExportPDF = () => {
        const doc = new jsPDF()
        doc.text("Laporan Pesanan Brandly", 14, 15)
        doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 22)

        const tableColumn = ["Tanggal", "Nama", "Perusahaan", "Layanan", "Status"]
        const tableRows = filteredOrders.map(order => [
            new Date(order.created_at).toLocaleDateString("id-ID"),
            order.name,
            order.company,
            order.service,
            order.status
        ])

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        })

        doc.save(`orders-${new Date().toISOString().split("T")[0]}.pdf`)
        logActivity("Export PDF", "Exported orders to PDF")
        toast.success('Export PDF berhasil')
    }

    const handlePrint = () => {
        window.print()
    }

    const handleWhatsAppClick = (templateText?: string) => {
        if (!selectedOrder) return

        let message = templateText || "Halo [Nama], terima kasih telah memesan layanan Brandly!"
        message = message
            .replace("[Nama]", selectedOrder.name)
            .replace("[Layanan]", selectedOrder.service)
            .replace("[Perusahaan]", selectedOrder.company)

        window.open(`https://wa.me/${selectedOrder.whatsapp.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`, '_blank')
        logActivity("WhatsApp Contact", `Contacted ${selectedOrder.name} via WA`)
    }

    const toggleSelectOrder = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map(o => o.id))
        }
    }

    const clearFilters = () => {
        setSearchTerm("")
        setStatusFilter("all")
        setServiceFilter("all")
        setTimelineFilter("all")
        setDateRange("all")
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        const matchesService = serviceFilter === "all" || order.service === serviceFilter
        const matchesTimeline = timelineFilter === "all" || order.timeline === timelineFilter

        let matchesDate = true
        if (dateRange !== "all") {
            const orderDate = new Date(order.created_at)
            const now = new Date()
            const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

            switch (dateRange) {
                case "today":
                    matchesDate = daysDiff === 0
                    break
                case "week":
                    matchesDate = daysDiff <= 7
                    break
                case "month":
                    matchesDate = daysDiff <= 30
                    break
            }
        }

        return matchesSearch && matchesStatus && matchesService && matchesTimeline && matchesDate
    })

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

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

    const hasActiveFilters = searchTerm || statusFilter !== "all" || serviceFilter !== "all" || timelineFilter !== "all" || dateRange !== "all"

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Package className="w-6 h-6" />
                    <span>Brandly Admin</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                >
                    <List className="w-4 h-4 mr-2" />
                    Daftar Pesanan
                </Button>
                <Button
                    variant={activeTab === "kanban" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("kanban")}
                >
                    <Kanban className="w-4 h-4 mr-2" />
                    Kanban Board
                </Button>
                <Button
                    variant={activeTab === "analytics" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("analytics")}
                >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Analytics
                </Button>
                <Button
                    variant={activeTab === "activity" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("activity")}
                >
                    <History className="w-4 h-4 mr-2" />
                    Aktivitas
                </Button>
            </nav>

            <div className="p-4 space-y-4 border-t border-border">
                {/* Notifications */}
                {notifications.length > 0 && (
                    <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-2 text-destructive font-semibold mb-2 text-sm">
                            <Bell className="w-4 h-4" />
                            Perhatian
                        </div>
                        <ul className="text-xs space-y-1 text-destructive/90">
                            {notifications.map((note, i) => (
                                <li key={i}>• {note}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-muted-foreground">Mode Gelap</span>
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
                </div>

                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col fixed h-full z-20">
                <SidebarContent />
            </aside>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
                <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <Package className="w-5 h-5 text-primary" />
                        <span>Brandly Admin</span>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {/* Top Bar (Desktop only actions) */}
                    <div className="hidden md:flex justify-end mb-6 print:hidden">
                        <Button variant="outline" size="sm" onClick={loadOrders} className="gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Refresh Data
                        </Button>
                    </div>

                    {activeTab === "analytics" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
                            <AnalyticsDashboard orders={orders} />
                        </div>
                    )}

                    {activeTab === "kanban" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
                            <KanbanBoard orders={orders} onStatusChange={handleStatusChange} />
                        </div>
                    )}

                    {activeTab === "activity" && (
                        <Card className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Log Aktivitas Admin</h2>
                                <Button variant="outline" size="sm" onClick={() => {
                                    localStorage.removeItem("adminActivityLogs")
                                    setActivityLogs([])
                                    toast.success("Log aktivitas dibersihkan")
                                }}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Bersihkan Log
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {activityLogs.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">Belum ada aktivitas tercatat.</p>
                                ) : (
                                    activityLogs.map((log) => (
                                        <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/20 border border-border/50">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <History className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{log.action}</p>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(log.timestamp).toLocaleString("id-ID")}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                                                <p className="text-xs text-muted-foreground mt-2">User: {log.user}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    )}

                    {activeTab === "orders" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Filters and Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 print:hidden">
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">Daftar Pesanan</h1>
                                    <p className="text-muted-foreground">
                                        Kelola pesanan masuk dari klien
                                        {hasActiveFilters && ` (${filteredOrders.length} hasil)`}
                                    </p>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto flex-wrap">
                                    {selectedOrders.length > 0 && (
                                        <>
                                            <Select onValueChange={(value) => handleBulkStatusUpdate(value as any)}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Update Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Set Pending</SelectItem>
                                                    <SelectItem value="contacted">Set Contacted</SelectItem>
                                                    <SelectItem value="completed">Set Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button onClick={handleBulkDelete} variant="destructive" size="sm">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Hapus ({selectedOrders.length})
                                            </Button>
                                        </>
                                    )}
                                    <div className="flex gap-2">
                                        <Button onClick={handleExportExcel} variant="outline" size="icon" title="Export Excel">
                                            <FileSpreadsheet className="w-4 h-4" />
                                        </Button>
                                        <Button onClick={handleExportPDF} variant="outline" size="icon" title="Export PDF">
                                            <FileText className="w-4 h-4" />
                                        </Button>
                                        <Button onClick={handlePrint} variant="outline" size="icon" title="Print">
                                            <Printer className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Filters */}
                            <Card className="p-4 mb-6 print:hidden">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Cari pesanan..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Status</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="contacted">Dihubungi</SelectItem>
                                            <SelectItem value="completed">Selesai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={serviceFilter} onValueChange={setServiceFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Layanan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Layanan</SelectItem>
                                            <SelectItem value="website">Website</SelectItem>
                                            <SelectItem value="branding">Branding</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={timelineFilter} onValueChange={setTimelineFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Timeline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Timeline</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="relaxed">Relaxed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={dateRange} onValueChange={setDateRange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tanggal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Waktu</SelectItem>
                                            <SelectItem value="today">Hari Ini</SelectItem>
                                            <SelectItem value="week">7 Hari Terakhir</SelectItem>
                                            <SelectItem value="month">30 Hari Terakhir</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {hasActiveFilters && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <Badge variant="secondary" className="gap-1">
                                            <Filter className="w-3 h-3" />
                                            {filteredOrders.length} hasil
                                        </Badge>
                                        <Button onClick={clearFilters} variant="ghost" size="sm" className="h-7">
                                            <X className="w-3 h-3 mr-1" />
                                            Clear Filters
                                        </Button>
                                    </div>
                                )}
                            </Card>

                            {/* Orders Table */}
                            <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur print:shadow-none print:border-none">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12 print:hidden">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                                        onChange={toggleSelectAll}
                                                        className="rounded border-gray-300"
                                                    />
                                                </TableHead>
                                                <TableHead>Tanggal</TableHead>
                                                <TableHead>Klien</TableHead>
                                                <TableHead>Layanan</TableHead>
                                                <TableHead>Budget</TableHead>
                                                <TableHead>Timeline</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right print:hidden">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoading ? (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="text-center py-8">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                            Memuat data...
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : currentOrders.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                                        {hasActiveFilters ? "Tidak ada pesanan yang sesuai filter." : "Belum ada pesanan masuk."}
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                currentOrders.map((order) => (
                                                    <TableRow key={order.id} className={selectedOrders.includes(order.id) ? "bg-secondary/50" : ""}>
                                                        <TableCell className="print:hidden">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedOrders.includes(order.id)}
                                                                onChange={() => toggleSelectOrder(order.id)}
                                                                className="rounded border-gray-300"
                                                            />
                                                        </TableCell>
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
                                                            <div className="text-xs text-muted-foreground print:hidden">{order.whatsapp}</div>
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
                                                            <div className="print:hidden">
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
                                                            </div>
                                                            <div className="hidden print:block">
                                                                {order.status}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right print:hidden">
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

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between px-6 py-4 border-t print:hidden">
                                        <div className="text-sm text-muted-foreground">
                                            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} dari {filteredOrders.length} pesanan
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <Button
                                                        key={page}
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setCurrentPage(page)}
                                                        className="w-8"
                                                    >
                                                        {page}
                                                    </Button>
                                                ))}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}
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
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Catatan Admin
                                        </h4>
                                    </div>
                                    <Textarea
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                        placeholder="Tambahkan catatan untuk pesanan ini..."
                                        className="min-h-[100px] mb-3"
                                    />
                                    <Button onClick={handleSaveNotes} disabled={isAddingNote} size="sm">
                                        {isAddingNote ? "Menyimpan..." : "Simpan Catatan"}
                                    </Button>
                                </div>
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
                                        <div className="flex gap-2">
                                            <InvoiceGenerator order={selectedOrder} />

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="bg-green-600 hover:bg-green-700 gap-2">
                                                        <Send className="w-4 h-4" />
                                                        WhatsApp
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {WA_TEMPLATES.map((template, i) => (
                                                        <DropdownMenuItem key={i} onClick={() => handleWhatsAppClick(template.text)}>
                                                            {template.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                    <DropdownMenuItem onClick={() => handleWhatsAppClick()}>
                                                        Chat Biasa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
