"use client"

import Link from "next/link"
import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  const teamMembers = [
    { id: "825220147", name: "Gerrant Enriqo Hiya" },
    { id: "825220134", name: "Saoloan Natan Yoel Silalahi" },
    { id: "825220153", name: "Amara Thuridha" },
    { id: "825220114", name: "Daffa Imani Saputra" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-background to-background/50 border-t border-border/50 text-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                Brandly
              </h2>
              <p className="text-sm text-foreground/70">
                Jasa Pembuatan Website & Branding untuk bisnis Anda
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-200 text-foreground/70 hover:text-primary"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Team Section */}
            <div className="pt-6 border-t border-border/30">
              <p className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                Tim Pengembang
              </p>
              <ul className="text-xs text-foreground/60 space-y-1.5">
                {teamMembers.map((member) => (
                  <li key={member.id}>
                    <span className="text-primary/80 font-medium">{member.id}</span>
                    {" - "}
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Layanan</h4>
            <ul className="space-y-3">
              {["Website Development", "Branding", "SEO"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Perusahaan</h4>
            <ul className="space-y-3">
              {["Tentang Kami", "Portfolio", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@brandly.id"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  info@brandly.id
                </a>
              </li>
              <li>
                <a
                  href="tel:+62"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  +62 XXX XXXX XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            &copy; 2025 Brandly. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
