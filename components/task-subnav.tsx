"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/task/business-planning", label: "Business Planning" },
  { href: "/task/business-model-canvas", label: "Business Model Canvas" },
  { href: "/task/porter-five-forces", label: "Porter Five Forces" },
  { href: "/task/presentation", label: "Presentation" },
]

export default function TaskSubnav() {
  const pathname = usePathname()
  return (
    <div className="border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm border",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/70 text-foreground/80 hover:text-foreground hover:bg-secondary border-border"
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
