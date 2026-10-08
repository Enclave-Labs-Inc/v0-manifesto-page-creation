// The hosted platform (dashboard). Set NEXT_PUBLIC_PLATFORM_URL once it has
// a different address; ontos.getenclave.ai is the default.
export const PLATFORM_URL = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'https://ontos.getenclave.ai').replace(/\/$/, '')

export const WAITLIST_URL = `${PLATFORM_URL}/waitlist`
export const SIGN_IN_URL = `${PLATFORM_URL}/login`
