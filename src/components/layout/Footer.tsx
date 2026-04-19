import Link from 'next/link'

const navigateLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Prints', href: '/prints' },
  { label: 'About', href: '/about' },
  { label: 'Paloma Vision', href: '/paloma-vision' },
]

const connectLinks = [
  { label: 'Instagram', href: 'https://instagram.com/fraseredwards' },
  { label: 'Vimeo', href: 'https://vimeo.com/fraseredwards' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/fraseredwards' },
]

export default function Footer() {
  return (
    <footer className="bg-deep text-deep-light">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl tracking-wider text-white mb-3">
              FRASER EDWARDS
            </h3>
            <p className="font-mono text-xs text-deep-mid tracking-wide">
              Photography &amp; Paloma Vision
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-deep-mid mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-deep-light hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-deep-mid mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-deep-light hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiries */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-deep-mid mb-6">
              Enquiries
            </h4>
            <a
              href="mailto:hello@fraseredwards.com"
              className="font-sans text-sm text-deep-light hover:text-white transition-colors duration-300 block mb-2"
            >
              hello@fraseredwards.com
            </a>
            <Link
              href="/contact"
              className="inline-block mt-4 font-sans font-bold text-xs uppercase tracking-[0.2em] text-signal hover:text-white transition-colors duration-300"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-deep-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-deep-muted">
            &copy; {new Date().getFullYear()} Fraser Edwards. All rights
            reserved.
          </p>
          <p className="font-mono text-[11px] text-deep-muted tracking-wider">
            51.5074&deg;N 0.1278&deg;W
          </p>
        </div>
      </div>
    </footer>
  )
}
