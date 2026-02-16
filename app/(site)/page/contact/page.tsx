'use client'

import { useState } from 'react'

const EMAIL_JS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send-form'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [sending, setSending] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const isFormValid =
    fullName.trim().length > 1 &&
    email.includes('@') &&
    message.trim().length > 5

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) return

    setSending(true)
    setStatus('idle')

    const formData = new FormData(e.currentTarget)

    formData.append(
      'service_id',
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || '',
    )
    formData.append(
      'template_id',
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || '',
    )
    formData.append('user_id', process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID || '')

    try {
      const res = await fetch(EMAIL_JS_API_URL, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to send')

      setStatus('success')
      setFullName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error sending form:', error)
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl px-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">Contact Us</h1>

        <p className="mb-8 text-sm text-slate-400">
          Prefer email? Reach us at{' '}
          <span className="font-semibold text-red-400">
            femalerockerscontact@gmail.com
          </span>
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              maxLength={50}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              maxLength={100}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || sending}
            className="mt-4 rounded-md bg-red-600 px-6 py-3 font-semibold text-black transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="mt-4 rounded-md border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
              ✅ Your message has been received. Our team will get back to you
              soon!
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              ❌ Something went wrong. Please try again later.
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
