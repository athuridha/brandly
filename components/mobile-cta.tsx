import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function MobileCTA() {
  return (
    <>
      {/* Spacer to prevent content being covered by fixed bar */}
      <div className="md:hidden h-20" aria-hidden />
      {/* Fixed bottom CTA bar */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-background/80 backdrop-blur border border-border rounded-xl shadow-lg p-3 flex items-center gap-2">
            <Button asChild className="flex-1">
              <a href="#contact">Konsultasi Gratis</a>
            </Button>
            <Button variant="outline" size="icon" asChild aria-label="Kontak">
              <a href="#contact">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
