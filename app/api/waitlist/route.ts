import { readFileSync } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'nodejs'

// Load the logo once at module scope. Attached to confirmation emails with a
// CID reference so Gmail renders it regardless of whether the asset is yet
// deployed to the public domain (which hotlinking would depend on).
const LOGO_CID = 'enclave-logo'
const LOGO_PATH = path.join(process.cwd(), 'public', 'enclave_logo_dark.png')
let logoAttachment: { filename: string; content: Buffer; contentId: string } | null = null
try {
  logoAttachment = {
    filename: 'enclave-logo.png',
    content: readFileSync(LOGO_PATH),
    contentId: LOGO_CID,
  }
} catch (err) {
  console.error('[waitlist] could not load logo at', LOGO_PATH, err)
}

const payloadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Enter a valid email').max(200),
  company: z.string().trim().min(1, 'Company is required').max(200),
  designation: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
})

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[waitlist] RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Server is not configured to send email yet.' },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = payloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please fix the highlighted fields.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { name, email, company, designation, message } = parsed.data

  const to = process.env.WAITLIST_TO ?? 'contact@getenclave.ai'
  const from = process.env.WAITLIST_FROM ?? 'Enclave Waitlist <onboarding@resend.dev>'
  // Always use the production URL in emails — localhost links would be dead
  // for recipients, so we don't fall back to the request origin here. Must be
  // the www host, since the apex redirects (307) and email clients won't follow
  // redirects for <img> sources, which breaks the logo.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.getenclave.ai'
  const callUrl =
    process.env.WAITLIST_CALL_URL ?? 'https://cal.com/shashank-bhardwaj-fwmii1/30min'

  const resend = new Resend(apiKey)

  try {
    const notification = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Waitlist · ${name}${company ? ` · ${company}` : ''}`,
      text: renderNotificationText({ name, email, company, designation, message }),
      html: renderNotificationHtml({ name, email, company, designation, message }),
    })

    if (notification.error) {
      console.error('[waitlist] notification send error', notification.error)
      return NextResponse.json(
        { error: 'We couldn’t send that right now. Please try again shortly.' },
        { status: 502 },
      )
    }

    // Confirmation to the submitter. Best-effort: a bad user email shouldn't
    // fail the whole signup — we've already captured the lead internally.
    const confirmation = await resend.emails
      .send({
        from,
        to: email,
        replyTo: to,
        subject: 'Thanks for joining the Enclave waitlist',
        text: renderConfirmationText({ name, company, siteUrl, callUrl, replyTo: to }),
        html: renderConfirmationHtml({ name, company, siteUrl, callUrl, replyTo: to }),
        ...(logoAttachment ? { attachments: [logoAttachment] } : {}),
      })
      .catch((err) => {
        console.error('[waitlist] confirmation threw', err)
        return { data: null, error: err }
      })

    if (confirmation.error) {
      console.error('[waitlist] confirmation send error', confirmation.error)
    }

    return NextResponse.json({
      ok: true,
      id: notification.data?.id ?? null,
      confirmationId: confirmation.data?.id ?? null,
    })
  } catch (err) {
    console.error('[waitlist] send threw', err)
    return NextResponse.json(
      { error: 'We couldn’t send that right now. Please try again shortly.' },
      { status: 502 },
    )
  }
}

type Payload = {
  name: string
  email: string
  company: string
  designation: string
  message: string
}

type ConfirmationPayload = {
  name: string
  company: string
  siteUrl: string
  callUrl: string
  replyTo: string
}

function renderNotificationText({
  name,
  email,
  company,
  designation,
  message,
}: Payload) {
  const lines = [
    'New Enclave waitlist signup',
    '',
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Company:     ${company}`,
  ]
  if (designation) lines.push(`Designation: ${designation}`)
  if (message) {
    lines.push('', 'Message:', message)
  }
  return lines.join('\n')
}

function renderConfirmationText({
  name,
  company,
  siteUrl,
  callUrl,
  replyTo,
}: ConfirmationPayload) {
  const firstName = name.split(' ')[0] || name
  return [
    `Hi ${firstName},`,
    '',
    'Thanks for joining the Enclave waitlist.',
    '',
    `We're onboarding a small group of design partners first. We'll reach out from ${replyTo} as soon as there's a slot for your team at ${company}.`,
    '',
    `If you'd rather talk sooner, book a 30-minute call here: ${callUrl}`,
    '',
    'While you wait:',
    `  Manifesto · ${siteUrl}/manifesto`,
    `  Demo · ${siteUrl}/demo`,
    `  Ontos (open source) · ${siteUrl}/ontos`,
    '',
    'If you have questions in the meantime, just reply to this email.',
    '',
    '— Shashank',
    'Enclave',
  ].join('\n')
}

function renderConfirmationHtml({
  name,
  company,
  siteUrl,
  callUrl,
  replyTo,
}: ConfirmationPayload) {
  const firstName = name.split(' ')[0] || name
  const linkStyle =
    'color:#050608; text-decoration:underline; text-underline-offset:3px;'
  // Referenced via CID — the actual bytes are attached to the outbound email,
  // so this renders without depending on a public URL being reachable.
  const logoSrc = `cid:${LOGO_CID}`
  return `
    <!doctype html>
    <html>
      <body style="margin:0; padding:32px 16px; background:#F7F7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#111214;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #E6E6E1; border-radius:8px; padding:36px;">
          <tr>
            <td>
              <a href="${siteUrl}" style="display:inline-block; text-decoration:none;">
                <img src="${logoSrc}" alt="Enclave" width="170" height="28" style="display:block; height:28px; width:170px; border:0; outline:none;" />
              </a>

              <h1 style="margin:32px 0 20px 0; font-size:22px; line-height:1.3; letter-spacing:-0.015em; color:#050608;">Thanks, ${escapeHtml(firstName)}.</h1>
              <p style="margin:0 0 16px 0; font-size:15px; line-height:1.6; color:#2A2D33;">You&rsquo;re on the Enclave waitlist.</p>
              <p style="margin:0 0 24px 0; font-size:15px; line-height:1.6; color:#2A2D33;">We&rsquo;re onboarding a small group of design partners first. We&rsquo;ll reach out from <a href="mailto:${escapeHtml(replyTo)}" style="${linkStyle}">${escapeHtml(replyTo)}</a> as soon as there&rsquo;s a slot for your team at ${escapeHtml(company)}.</p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;">
                <tr>
                  <td style="background:#050608; border-radius:6px;">
                    <a href="${callUrl}" style="display:inline-block; padding:14px 22px; color:#FFFFFF; font-size:12px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; text-decoration:none;">
                      Book a 30-min call
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px 0; font-size:13px; line-height:1.55; color:#6A6D72;">Prefer to talk sooner? Grab a slot and we&rsquo;ll make time.</p>

              <div style="margin:28px 0 24px 0; padding:20px 22px; background:#F7F7F2; border:1px solid #EDEDE8; border-radius:6px;">
                <p style="margin:0 0 12px 0; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#6A6D72;">While you wait</p>
                <p style="margin:0 0 8px 0; font-size:14px; line-height:1.6; color:#2A2D33;"><a href="${siteUrl}/manifesto" style="${linkStyle}">Read the manifesto</a></p>
                <p style="margin:0 0 8px 0; font-size:14px; line-height:1.6; color:#2A2D33;"><a href="${siteUrl}/demo" style="${linkStyle}">See Enclave in action</a></p>
                <p style="margin:0; font-size:14px; line-height:1.6; color:#2A2D33;"><a href="${siteUrl}/ontos" style="${linkStyle}">Explore Ontos (open source)</a></p>
              </div>

              <p style="margin:0 0 24px 0; font-size:14px; line-height:1.6; color:#55585D;">If you have questions in the meantime, just hit reply.</p>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#111214;">— Shashank<br/><span style="color:#6A6D72;">Enclave</span></p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function renderNotificationHtml({
  name,
  email,
  company,
  designation,
  message,
}: Payload) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 6px 16px 6px 0; color:#6A6D72; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; white-space:nowrap; vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding: 6px 0; color:#111214; font-size:14px; vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `
  return `
    <!doctype html>
    <html>
      <body style="margin:0; padding:24px; background:#F7F7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#111214;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #E6E6E1; border-radius:8px; padding:28px;">
          <tr>
            <td>
              <p style="margin:0 0 20px 0; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#6A6D72;">New waitlist signup</p>
              <h1 style="margin:0 0 20px 0; font-size:22px; line-height:1.25; letter-spacing:-0.015em; color:#050608;">${escapeHtml(name)}</h1>
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                ${row('Email', email)}
                ${row('Company', company)}
                ${designation ? row('Designation', designation) : ''}
              </table>
              ${
                message
                  ? `<div style="margin-top:20px; padding-top:20px; border-top:1px solid #EDEDE8;">
                      <p style="margin:0 0 8px 0; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6A6D72;">Message</p>
                      <p style="margin:0; font-size:14px; line-height:1.55; color:#111214; white-space:pre-wrap;">${escapeHtml(message)}</p>
                    </div>`
                  : ''
              }
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
