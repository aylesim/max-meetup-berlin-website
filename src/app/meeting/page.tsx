import MeetingInfo from '@/app/_components/meeting-info'
import { getMeetupBySlug } from '@/lib/api'

export default async function MeetingPage() {
  const data = await getMeetupBySlug('2025-01-17-next')
  
  return (
    <main>
       <MeetingInfo data={data} />
    </main>
  )
} 