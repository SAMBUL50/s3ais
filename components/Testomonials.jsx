'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content: "This AI interview coach helped me land my dream job at Google. The feedback was so precise it felt like I had a real hiring manager coaching me.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at Meta",
      content: "The industry-specific questions were spot on. I practiced with the exact type of questions I got in my final round at Meta.",
      rating: 5
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Data Scientist at Amazon",
      content: "The progress tracking showed me exactly where I needed to improve. My confidence scores doubled in just 2 weeks of practice.",
      rating: 4
    },
    {
      id: 4,
      name: "Emily Wilson",
      role: "UX Designer at Apple",
      content: "I was skeptical about AI feedback at first, but the tone analysis helped me sound more confident and articulate in my interviews.",
      rating: 5
    },
    {
      id: 5,
      name: "James Kim",
      role: "Investment Banker at JPMorgan",
      content: "The behavioral question practice was invaluable. I went from rambling to delivering concise, structured answers that impressed my interviewers.",
      rating: 5
    }
  ]

  const controls = useAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const itemWidth = 400 // Width of each testimonial card
  const gap = 24 // Gap between cards

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    controls.start({
      x: -currentIndex * (itemWidth + gap),
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    })
  }, [currentIndex, controls])

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_1280.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 sm:text-4xl">
            Success Stories
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
            Hear from professionals who landed their dream jobs
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#0a192f] via-[#0a192f]/90 to-transparent"></div>
          
          <motion.div
            ref={containerRef}
            className="flex"
            animate={controls}
            style={{ gap: `${gap}px` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 p-8 rounded-xl backdrop-blur-sm"
                style={{
                  width: `${itemWidth}px`,
                  background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.6) 0%, rgba(17, 34, 64, 0.8) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.1)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="flex items-center justify-between">
                  {renderStars(testimonial.rating)}
                  <svg
                    className="w-8 h-8 text-blue-400/30"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-6 text-gray-300">{testimonial.content}</p>
                <div className="mt-8">
                  <div className="text-lg font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-blue-400 w-6' : 'bg-gray-600'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-32 right-[15%] w-48 sm:w-72 h-48 sm:h-72 -z-10">
        <div className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(251deg, #ccff02 74.22%, #59ffcd 89.57%)',
            filter: 'blur(60px) sm:blur(80px)',
            opacity: '0.15'
          }}
        />
      </div>

      <div className="absolute -bottom-40 left-[15%] w-48 sm:w-80 h-48 sm:h-80 -z-10">
        <div className="w-full h-full rounded-full" 
          style={{
            background: 'linear-gradient(80deg, #87c0ff, #d6ffbd 33%, #ffe79e 69%)',
            filter: 'blur(70px) sm:blur(100px)',
            opacity: '0.1'
          }}
        />
      </div>
    </div>
  )
}