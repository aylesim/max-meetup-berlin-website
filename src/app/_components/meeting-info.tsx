'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import DateFormatter from './date-formatter'
import Container from './container'
import Image from 'next/image'
import Link from 'next/link'

export default function MeetingInfo({ data }: { data: any }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black px-4">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />
      
      <motion.div 
        className="z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title Section */}
        <div className="border-4 border-black p-6 md:p-8 lg:p-10 mb-8 transform -rotate-1">
          <h1 className="text-[min(7.5vw,5rem)] md:text-[min(8vw,6.5rem)] font-bold mb-6 md:mb-8 uppercase tracking-[-0.06em] w-full whitespace-normal leading-[1.3] flex-shrink-0">
            {data.title}
          </h1>
          <div className="text-3xl md:text-[1.5rem] font-mono transform rotate-1">
            {data.subtitle}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time and Location Section */}
          <motion.div 
            className="border-l-4 border-black pl-4 transform rotate-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">When & Where</h2>
            <div className="font-mono space-y-2">
              <p className="text-xl">{data.when_where.date}</p>
              <p className="text-xl">{data.when_where.location}</p>
              <p className="text-xl">{data.when_where.time}</p>
            </div>
            <div className="mt-6">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-3 transition-transform hover:rotate-0">
                Add to Calendar
              </Button>
            </div>
          </motion.div>

          {/* Schedule Section */}
          <motion.div 
            className="border-t-4 md:border-t-0 md:border-l-4 border-black pl-4 pt-4 md:pt-0 transform -rotate-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">Schedule</h2>
            <div className="font-mono space-y-4">
              {data.schedule.map((item: any, index: number) => (
                <div key={index}>
                  <p className="text-xl font-bold">{item.time}</p>
                  <p className="text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* People Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight text-center">Featured Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.people.map((person: any, index: number) => (
              <motion.div
                key={index}
                className="border-4 border-black p-6 transform hover:rotate-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="relative w-full aspect-square mb-4 overflow-hidden">
                  <Image
                    src={person.picture}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                <p className="font-mono text-lg mb-4">{person.bio}</p>
                <div className="flex gap-4">
                  <Link 
                    href={person.link1}
                    target="_blank"
                    className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors"
                  >
                    Link 1
                  </Link>
                  <Link 
                    href={person.link2}
                    target="_blank"
                    className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors"
                  >
                    Link 2
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
} 