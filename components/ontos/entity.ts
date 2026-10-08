// Entity-type colours: the first six slots of the validated categorical palette
// (dataviz reference, light mode). Identity only; every node and chip also
// carries its type as text, so colour is never the sole signal.
export const ENTITY = {
  Company: '#2a78d6',
  Person: '#eb6834',
  Filing: '#1baf7a',
  Committee: '#eda100',
  Regulator: '#e87ba4',
  Model: '#4a3aa7',
} as const

export type EntityType = keyof typeof ENTITY

/** Soft multi-hue wash used behind hero and product panels (Glean-style aurora). */
export const AURORA =
  'radial-gradient(ellipse 55% 60% at 12% 18%, oklch(0.86 0.09 265 / 0.55) 0%, transparent 70%),' +
  'radial-gradient(ellipse 45% 55% at 88% 12%, oklch(0.88 0.08 25 / 0.45) 0%, transparent 70%),' +
  'radial-gradient(ellipse 50% 60% at 70% 90%, oklch(0.88 0.08 175 / 0.45) 0%, transparent 70%),' +
  'radial-gradient(ellipse 40% 45% at 30% 85%, oklch(0.9 0.07 300 / 0.4) 0%, transparent 70%)'
