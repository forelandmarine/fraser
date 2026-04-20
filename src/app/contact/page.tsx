import Image from 'next/image'
import ContactForm from '@/components/ui/ContactForm'

export const metadata = {
  title: 'Contact | Fraser Edwards Photography',
  description:
    'Get in touch with Fraser Edwards for bookings, print sales, collaborations, and press enquiries.',
}

export default function ContactPage() {
  return (
    <section className="bg-paper min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Image */}
        <div className="relative h-[50vh] lg:h-auto">
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <Image
              src="/images/raven-side.jpg"
              alt="Aerial view of yacht under sail"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center px-8 py-16 md:px-16 lg:px-20 lg:py-32">
          <div className="w-full max-w-lg">
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost mb-4">
              Get in touch
            </span>
            <h1
              className="font-display text-ink tracking-wider mb-10"
              style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
            >
              CONTACT
            </h1>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
