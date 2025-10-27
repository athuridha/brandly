export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Brandly</h3>
            <p className="opacity-75">Jasa Pembuatan Website & Branding untuk bisnis Anda</p>
            <div className="mt-6 pt-6 border-t border-background/20">
              <p className="text-sm opacity-60 mb-3 font-semibold">Tim Pengembang:</p>
              <ul className="text-sm opacity-60 space-y-1">
                <li>825220147 - Gerrant Enriqo Hiya</li>
                <li>825220134 - Saoloan Natan Yoel Silalahi</li>
                <li>825220153 - Amara Thuridha</li>
                <li>825220114 - Daffa Imani Saputra</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 opacity-75">
              <li>
                <a href="#" className="hover:opacity-100">
                  Website Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  SEO
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 opacity-75">
              <li>
                <a href="#" className="hover:opacity-100">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 opacity-75">
              <li>Email: info@brandly.id</li>
              <li>Phone: +62 XXX XXXX XXXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center opacity-75">
          <p>&copy; 2025 Brandly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
