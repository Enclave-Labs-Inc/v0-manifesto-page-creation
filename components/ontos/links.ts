// The hosted platform (dashboard). Set NEXT_PUBLIC_PLATFORM_URL once it has
// its own subdomain; the Vercel URL is the fallback until then.
export const PLATFORM_URL = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'https://ontos-web.vercel.app').replace(/\/$/, '')

export const WAITLIST_URL = `${PLATFORM_URL}/waitlist`
export const SIGN_IN_URL = `${PLATFORM_URL}/login`
