import MeetingInfo from '@/app/_components/meeting-info'
import { getPostBySlug } from '@/lib/api'

export default async function MeetingPage() {
  const data = await getPostBySlug('next-meetup')
  
  return (
    <main>
      <MeetingInfo data={data} />
    </main>
  )
} 