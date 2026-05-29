export type ReleaseMeta = {
  slug: string
  version: string
  date: string
  title: string
  subtitle: string
  description: string
  tags: string[]
}

export const releases: ReleaseMeta[] = [
  {
    slug: 'sovereign-search-at-scale',
    version: 'v0.0.1',
    date: '27 May 2026',
    title: 'Sovereign Search at Scale',
    subtitle: 'A detailed benchmark report',
    description:
      'Our first public benchmark of the sovereign retrieval engine: tested on a 1M-chunk synthetic corpus and real AWS S3. ~13 KB read per query at scale, sub-millisecond warm latency, competitive recall on FiQA, plus the cache bug we caught and the permission claim we tested and retired.',
    tags: ['Benchmark', 'Retrieval engine'],
  },
]

export function getRelease(slug: string): ReleaseMeta | undefined {
  return releases.find((release) => release.slug === slug)
}
