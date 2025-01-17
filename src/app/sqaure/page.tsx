import { getMeetupBySlug } from '@/lib/api'
import SquarePosterContent from './square-poster-content'

export default async function SquarePoster() {
  const data = await getMeetupBySlug('2025-01-17-next')
  return <SquarePosterContent data={data} />
}
