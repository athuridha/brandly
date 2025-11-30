"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Layanan" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#pricing", label: "Harga" },
  ] as const

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? "bg-background/50 backdrop-blur border-b border-border/50"
      : "bg-background/95 backdrop-blur border-b border-border"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Brandly Home" className="flex items-center gap-2">
          <Image
            src="/brandly.png"
            alt="Brandly logo"
            width={140}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />
          <Button asChild className="ml-2">
            <a href="#contact">Hubungi Kami</a>
          </Button>
        </div>

        {/* Mobile actions: Theme toggle + burger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle variant="outline" size="icon" className="rounded-lg" />
          <button
            className="p-2 rounded-lg hover:bg-secondary transition"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/70 backdrop-blur border-t border-border/60 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="w-full">
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
