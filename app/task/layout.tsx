import type { ReactNode } from "react"

export default function TaskLayout({ children }: { children: ReactNode }) {
  // Minimal layout: use global navbar; no local sub-navigation
  return <>{children}</>
}
