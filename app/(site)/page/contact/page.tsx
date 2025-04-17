'use client'

import { useState } from 'react'

const EMAIL_JS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send-form'

export default function ContactPage() {
  const [isMessageSent, setIsMessageSent] = useState<boolean | null>(null)
  const [sending, setSending] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSending(true)
    e.preventDefault()

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

      if (res.ok) {
        setIsMessageSent(true)
        setFullName('')
        setEmail('')
        setMessage('')
        setSending(false)
      } else {
        setIsMessageSent(false)
      }
    } catch (error) {
      console.error('Error sending the form:', error)
    }
  }

  const isFormValid = fullName && email && message

  return (
    <form
      className="secondary-light-color flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <p>
        Please contact us via{' '}
        <span className="font-bold underline">
          femalerockerscontact@gmail.com
        </span>{' '}
        or using the form below.
      </p>
      <label htmlFor="fullName">Full name:</label>
      <input
        className="text-black bg-white p-2"
        type="text"
        name="fullname"
        placeholder="Full name"
        required
        minLength={1}
        maxLength={50}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        className="text-black bg-white p-2"
        type="email"
        name="email"
        placeholder="Email"
        required
        minLength={5}
        maxLength={100}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="message">Message:</label>
      <textarea
        className="text-black bg-white p-2"
        placeholder="Your message"
        name="message"
        rows={5}
        cols={33}
        maxLength={1000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        disabled={!isFormValid || sending}
        className="w-40 rounded-md bg-red-700 p-3 text-black hover:bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {sending ? 'Sending...' : !isFormValid ? 'Fill the form' : 'Send'}
      </button>
      {isMessageSent ? (
        <h1 className="text-xl font-bold text-green-400">
          WE RECEIVED YOUR MESSAGE! <br /> A member of our team will respond to
          your inquiry. Thanks for contacting Female Rockers!
        </h1>
      ) : (
        ''
      )}
    </form>
  )
}
