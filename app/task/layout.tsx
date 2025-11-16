import type { ReactNode } from "react"

export default function TaskLayout({ children }: { children: ReactNode }) {
  // Layout kosong: navbar sudah di root layout
  return <>{children}</>
}
