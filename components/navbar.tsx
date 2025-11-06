"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    { href: "/business-model-canvas", label: "Business Model Canvas" },
    { href: "/business-planning", label: "Business Planning" },
    { href: "/porter-five-forces", label: "Porter's Five Forces" },
    { href: "/presentation", label: "Presentasi Project" },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/50 backdrop-blur border-b border-border/50" 
        : "bg-background/95 backdrop-blur border-b border-border"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">Brandly</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <a href="#contact">Hubungi Kami</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
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
