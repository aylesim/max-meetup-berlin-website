'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

type MeetingData = {
    title: string
    subtitle: string
    description: string
    when_where: string
    schedule: string
    Speaker_0: {
      name_0: string
      picture_0: string
      bio_0: string
      link1_0: string
      link2_0: string
    }
  }

export default function SquarePosterContent({ data }: { data: MeetingData }) {
  return (
    <div className="w-[1080px] h-[1080px] relative bg-white text-black overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />
      
      {/* Speaker Image */}
      <Image 
        src={data.Speaker_0.picture_0} 
        alt={data.Speaker_0.name_0} 
        layout="fill" 
        objectFit="cover" 
        className="absolute inset-0 z-0" 
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full p-12 flex flex-col">
        {/* Title Block */}
        <motion.div 
          className="border-8 border-black p-8 mb-8 transform -rotate-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-bold mb-6 uppercase tracking-tight leading-none">
            {data.title}
          </h1>
          <div className="text-3xl font-mono transform rotate-1">
            {data.subtitle}
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 flex-grow">
          {/* Time and Location */}
          <motion.div 
            className="border-l-8 border-black pl-6 transform rotate-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">When & Where</h2>
            <div className="font-mono text-2xl whitespace-pre-wrap">
              {data.when_where}
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div 
            className="border-l-8 border-black pl-6 transform -rotate-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Schedule</h2>
            <div className="font-mono text-xl whitespace-pre-wrap">
              {data.schedule}
            </div>
          </motion.div>
        </div>

        {/* Speaker Section */}
        <motion.div 
          className="mt-auto border-t-8 border-black pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6 uppercase tracking-tight">Featured Speaker</h2>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-bold mb-2">{data.Speaker_0.name_0}</h3>
              <p className="font-mono text-xl max-w-2xl">{data.Speaker_0.bio_0}</p>
            </div>
            <div className="flex gap-4 items-center transform -rotate-2">
              <div className="text-6xl font-bold font-mono">#</div>
              <div className="text-4xl font-bold uppercase">MaxMeetup</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 