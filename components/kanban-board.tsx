"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, MoreVertical, Clock, AlertCircle } from "lucide-react"
import { Order } from "@/lib/supabase"

interface KanbanBoardProps {
    orders: Order[]
    onStatusChange: (id: string, newStatus: "pending" | "contacted" | "completed") => void
}

const COLUMNS = [
    { id: "pending", title: "Pending", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    { id: "contacted", title: "Dihubungi", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "completed", title: "Selesai", color: "bg-green-500/10 text-green-500 border-green-500/20" },
]

export function KanbanBoard({ orders, onStatusChange }: KanbanBoardProps) {
    const [columns, setColumns] = useState<{ [key: string]: Order[] }>({
        pending: [],
        contacted: [],
        completed: [],
    })

    useEffect(() => {
        const newColumns = {
            pending: orders.filter(o => o.status === "pending"),
            contacted: orders.filter(o => o.status === "contacted"),
            completed: orders.filter(o => o.status === "completed"),
        }
        setColumns(newColumns)
    }, [orders])

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) return

        if (source.droppableId === destination.droppableId) {
            // Reorder in same column (optional implementation)
            return
        }

        // Move to different column
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const order = sourceColumn.find(o => o.id === draggableId)

        if (!order) return

        // Optimistic update
        const newSourceColumn = sourceColumn.filter(o => o.id !== draggableId)
        const newDestColumn = [...destColumn, { ...order, status: destination.droppableId as any }]

        setColumns({
            ...columns,
            [source.droppableId]: newSourceColumn,
            [destination.droppableId]: newDestColumn,
        })

        // Trigger actual update
        onStatusChange(draggableId, destination.droppableId as "pending" | "contacted" | "completed")
    }

    const getTimelineColor = (timeline: string) => {
        switch (timeline) {
            case "urgent": return "text-red-500 bg-red-500/10"
            case "normal": return "text-blue-500 bg-blue-500/10"
            default: return "text-green-500 bg-green-500/10"
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-hidden">
                {COLUMNS.map(column => (
                    <div key={column.id} className="flex flex-col h-full">
                        <div className={`p-4 rounded-t-lg border-b-2 flex items-center justify-between bg-card ${column.color}`}>
                            <h3 className="font-bold flex items-center gap-2">
                                {column.title}
                                <Badge variant="secondary" className="ml-2">
                                    {columns[column.id]?.length || 0}
                                </Badge>
                            </h3>
                        </div>
                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`flex-1 p-4 bg-secondary/20 rounded-b-lg overflow-y-auto space-y-3 transition-colors ${snapshot.isDraggingOver ? "bg-secondary/40" : ""
                                        }`}
                                >
                                    {columns[column.id]?.map((order, index) => (
                                        <Draggable key={order.id} draggableId={order.id} index={index}>
                                            {(provided, snapshot) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${snapshot.isDragging ? "shadow-lg scale-105 ring-2 ring-primary" : ""
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-semibold truncate pr-2">{order.name}</h4>
                                                        {order.timeline === 'urgent' && (
                                                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3 truncate">{order.company}</p>

                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <Badge variant="outline" className="text-xs font-normal">
                                                            {order.service}
                                                        </Badge>
                                                        <Badge variant="outline" className={`text-xs font-normal border-0 ${getTimelineColor(order.timeline)}`}>
                                                            {order.timeline}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="w-3 h-3" />
                                                            {order.budget}
                                                        </div>
                                                    </div>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    )
}
