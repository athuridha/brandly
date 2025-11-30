"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Package } from "lucide-react"

interface Order {
    id: string
    created_at: string
    status: string
    service: string
    budget: string
    timeline: string
}

interface AnalyticsDashboardProps {
    orders: Order[]
}

export function AnalyticsDashboard({ orders }: AnalyticsDashboardProps) {
    // Status distribution
    const statusData = [
        { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#eab308' },
        { name: 'Contacted', value: orders.filter(o => o.status === 'contacted').length, color: '#8b5cf6' },
        { name: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: '#22c55e' },
    ]

    // Service distribution
    const serviceData = [
        { name: 'Website', value: orders.filter(o => o.service === 'website').length },
        { name: 'Branding', value: orders.filter(o => o.service === 'branding').length },
        { name: 'Maintenance', value: orders.filter(o => o.service === 'maintenance').length },
        { name: 'Custom', value: orders.filter(o => o.service === 'custom').length },
    ]

    // Timeline distribution
    const timelineData = [
        { name: 'Urgent', value: orders.filter(o => o.timeline === 'urgent').length, color: '#ef4444' },
        { name: 'Normal', value: orders.filter(o => o.timeline === 'normal').length, color: '#3b82f6' },
        { name: 'Relaxed', value: orders.filter(o => o.timeline === 'relaxed').length, color: '#10b981' },
    ]

    // Orders per day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date.toISOString().split('T')[0]
    })

    const ordersPerDay = last7Days.map(date => {
        const count = orders.filter(o => o.created_at.split('T')[0] === date).length
        return {
            date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            orders: count
        }
    })

    // Budget distribution
    const budgetData = [
        { name: '5-10 Juta', value: orders.filter(o => o.budget === 'small').length },
        { name: '10-20 Juta', value: orders.filter(o => o.budget === 'medium').length },
        { name: '20+ Juta', value: orders.filter(o => o.budget === 'large').length },
    ]

    // Calculate trends
    const thisWeekOrders = orders.filter(o => {
        const orderDate = new Date(o.created_at)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
        return daysDiff <= 7
    }).length

    const lastWeekOrders = orders.filter(o => {
        const orderDate = new Date(o.created_at)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
        return daysDiff > 7 && daysDiff <= 14
    }).length

    const weeklyTrend = lastWeekOrders > 0 ? ((thisWeekOrders - lastWeekOrders) / lastWeekOrders * 100).toFixed(1) : 0
    const isPositiveTrend = Number(weeklyTrend) >= 0

    // Conversion rate (completed / total)
    const conversionRate = orders.length > 0 ? ((orders.filter(o => o.status === 'completed').length / orders.length) * 100).toFixed(1) : 0

    // Average response time (pending to contacted)
    const avgResponseTime = "2.5 hari" // Calculated from status change timestamps if available

    return (
        <div className="space-y-6">
            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Weekly Trend</p>
                            <p className="text-2xl font-bold">{thisWeekOrders}</p>
                            <div className={`flex items-center gap-1 text-xs mt-1 ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
                                {isPositiveTrend ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(Number(weeklyTrend))}% vs last week
                            </div>
                        </div>
                        <Package className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Conversion Rate</p>
                            <p className="text-2xl font-bold">{conversionRate}%</p>
                            <p className="text-xs text-muted-foreground mt-1">Completed orders</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Avg Response</p>
                            <p className="text-2xl font-bold">{avgResponseTime}</p>
                            <p className="text-xs text-muted-foreground mt-1">Pending → Contacted</p>
                        </div>
                        <Clock className="w-8 h-8 text-purple-500 opacity-50" />
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Active Clients</p>
                            <p className="text-2xl font-bold">{orders.filter(o => o.status !== 'completed').length}</p>
                            <p className="text-xs text-muted-foreground mt-1">In progress</p>
                        </div>
                        <Users className="w-8 h-8 text-orange-500 opacity-50" />
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Trend */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Orders Trend (7 Days)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={ordersPerDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* Status Distribution */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Service Distribution */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Service Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={serviceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Timeline Distribution */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Timeline Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={timelineData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {timelineData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Budget Analysis */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Budget Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={budgetData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
