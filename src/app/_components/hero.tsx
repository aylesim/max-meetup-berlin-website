'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero({ data }: { data: any }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black px-4">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />
      
      <motion.div 
        className="z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-4 border-black p-6 md:p-8 lg:p-10 mb-8 transform -rotate-1">
          <h1 className="text-[min(7.5vw,5rem)] md:text-[min(8vw,6.5rem)] font-bold mb-6 md:mb-8 uppercase tracking-[-0.06em] w-full whitespace-normal leading-[1.3] flex-shrink-0">
          {data.title}
          </h1>
          <div className="text-2xl md:text-3xl font-mono transform rotate-1">
          {data.subtitle}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 border-l-4 border-black pl-4 transform rotate-1">
            <p className="text-xl md:text-2xl mb-4 font-mono">
            {data.description}
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-3 transition-transform hover:rotate-0">
              {data.mail_button}
            </Button>
          </div>
          
          <div className="flex-1 border-t-4 border-black pt-4 transform -rotate-1">
            <div className="text-5xl font-bold mb-2 uppercase tracking-tight">{data.next_meetup_0}</div>
            <div className="font-mono">
              {data.next_meetup_1}
              <br />
              {data.next_meetup_2}
              <br />
              {data.next_meetup_3}
            </div>
          </div>
        </div>
      </motion.div>

      <div 
        className="fixed w-12 h-12 rounded-full bg-black mix-blend-difference pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </section>
  )
}

