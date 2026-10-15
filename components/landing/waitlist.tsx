'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

type Form = {
  name: string
  email: string
  designation: string
  company: string
  message: string
}

const EMPTY: Form = {
  name: '',
  email: '',
  designation: '',
  company: '',
  message: '',
}

export default function Waitlist() {
  const [form, setForm] = useState<Form>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update(field: keyof Form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="relative bg-white text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-28 pb-20 sm:px-10 sm:pt-32 lg:px-14 lg:pt-40 lg:pb-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
              Join the waitlist
            </p>

            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.025em]">
              <span className="block">Be the first to use Enclave.</span>
              <span className="block text-[#6A6D72]">
                We&rsquo;ll reach out when a slot opens.
              </span>
            </h2>

            <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-[#55585D]">
              Enclave is onboarding a small group of design partners first. Tell us a
              little about your team and we&rsquo;ll be in touch.
            </p>
          </div>

          <div>
            {submitted ? (
              <SuccessState name={form.name} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="waitlist-name"
                    label="Name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                  />
                  <TextField
                    id="waitlist-email"
                    label="Work email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                  />
                  <TextField
                    id="waitlist-designation"
                    label="Designation"
                    autoComplete="organization-title"
                    value={form.designation}
                    onChange={update('designation')}
                  />
                  <TextField
                    id="waitlist-company"
                    label="Company"
                    required
                    autoComplete="organization"
                    value={form.company}
                    onChange={update('company')}
                  />
                </div>

                <TextArea
                  id="waitlist-message"
                  label={'Anything you’d like us to know?'}
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                />

                {error && (
                  <p
                    role="alert"
                    className="text-[13px] leading-[1.5] text-[#B4321C]"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex h-[48px] w-fit items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#050608] disabled:active:scale-100"
                >
                  {submitting ? 'Sending…' : 'Request access'}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

type FieldBaseProps = {
  id: string
  label: string
  required?: boolean
}

function TextField({
  id,
  label,
  required,
  type = 'text',
  autoComplete,
  value,
  onChange,
}: FieldBaseProps & {
  type?: string
  autoComplete?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="h-[46px] rounded-[6px] border border-[#D8D8D3] bg-white px-4 text-[14px] text-[#111214] placeholder:text-[#9EA2A9] transition-colors duration-150 focus:border-[#050608] focus:outline-none"
      />
    </label>
  )
}

function TextArea({
  id,
  label,
  required,
  rows = 4,
  value,
  onChange,
}: FieldBaseProps & {
  rows?: number
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        className="resize-none rounded-[6px] border border-[#D8D8D3] bg-white px-4 py-3 text-[14px] leading-[1.5] text-[#111214] placeholder:text-[#9EA2A9] transition-colors duration-150 focus:border-[#050608] focus:outline-none"
      />
    </label>
  )
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6A6D72]">
      {label}
      {required && <span className="ml-1 text-[#9EA2A9]">*</span>}
    </span>
  )
}

function SuccessState({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-start rounded-[8px] border border-[#D8D8D3] bg-[#F7F7F2] p-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050608] text-[oklch(0.985_0_0)]">
        <Check className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <h3 className="mt-5 font-display text-[22px] leading-[1.2] tracking-[-0.02em] text-[#111214]">
        {name ? `Thanks, ${name.split(' ')[0]}.` : 'Thanks for signing up.'}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.6] text-[#55585D]">
        You&rsquo;re on the waitlist. We&rsquo;ll reach out from
        contact@getenclave.ai as soon as there&rsquo;s a slot for your team.
      </p>
    </div>
  )
}
