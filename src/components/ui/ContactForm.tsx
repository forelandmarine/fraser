'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const subjects = [
  'Booking Enquiry',
  'Print Sales',
  'Collaboration',
  'Press',
  'Other',
] as const

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.enum(subjects, {
    error: 'Please select a subject',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong'
      )
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center min-h-[400px] space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
          Sent
        </span>
        <h3
          className="font-display text-ink tracking-wider"
          style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
        >
          THANK YOU
        </h3>
        <p className="font-sans text-base text-ink-soft max-w-md">
          Your message has been received. Fraser will be in touch shortly.
        </p>
      </div>
    )
  }

  const inputClasses =
    'w-full bg-transparent border border-ink-whisper/40 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-ghost/60 focus:outline-none focus:border-ink transition-colors duration-300'
  const labelClasses =
    'block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-ghost mb-2'
  const errorClasses = 'font-mono text-[0.6rem] text-signal mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className={inputClasses}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className={errorClasses}>{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={inputClasses}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          })}
        />
        {errors.email && (
          <p className={errorClasses}>{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClasses}>
          Subject
        </label>
        <select
          id="subject"
          className={`${inputClasses} appearance-none cursor-pointer`}
          defaultValue=""
          {...register('subject', { required: 'Please select a subject' })}
        >
          <option value="" disabled>
            Select a subject
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className={errorClasses}>{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell Fraser about your project..."
          className={`${inputClasses} resize-none`}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
          })}
        />
        {errors.message && (
          <p className={errorClasses}>{errors.message.message}</p>
        )}
      </div>

      {/* Error */}
      {submitError && (
        <p className="font-mono text-xs text-signal">{submitError}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-signal text-white font-display text-lg tracking-wider px-10 py-3 hover:bg-signal/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  )
}
