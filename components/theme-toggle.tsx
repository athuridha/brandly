"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

type ButtonProps = React.ComponentProps<typeof Button>

export default function ThemeToggle({ variant, size, className, ...props }: ButtonProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button
        variant={variant ?? "ghost"}
        size={size ?? "icon"}
        aria-label="Toggle theme"
        className={`opacity-70 animate-pulse ${className ?? ""}`}
        disabled
        {...props}
      >
        <Moon className="size-5" />
      </Button>
    )
  }

  const isDark = (theme ?? resolvedTheme) === "dark"

  return (
    <Button
      variant={variant ?? "ghost"}
      size={size ?? "icon"}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
      {...props}
    >
      {isDark ? (
        <Sun className="size-5 rotate-0 scale-100 transition-all duration-300" />
      ) : (
        <Moon className="size-5 rotate-0 scale-100 transition-all duration-300" />
      )}
    </Button>
  )
}
