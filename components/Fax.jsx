'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Your Personal AI Interview Coach?",
      answer: "Double your chances of landing that job offer with our AI-powered interview coaching platform. We provide realistic mock interviews with personalized feedback to help you perform your best when it matters most."
    },
    {
      question: "Can the AI really simulate real interviews?",
      answer: "Yes! Our advanced AI analyzes your responses just like a human interviewer would, evaluating your tone, content, and delivery to give you actionable feedback for improvement."
    },
    {
      question: "Does the platform offer industry-specific questions?",
      answer: "Absolutely. We provide tailored questions for over 50 industries and 1000+ companies, so you can practice the exact scenarios you'll face in your real interviews."
    },
    {
      question: "How does the progress tracking work?",
      answer: "Our dashboard shows your improvement across key metrics like confidence, clarity, and response time, helping you track your journey from practice to perfection."
    }
  ];

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
            Questions & Answers
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
            Find answers to common questions about our AI Interview Coach
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16 space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="overflow-hidden transition-all duration-300 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 backdrop-blur-sm group"
              onClick={() => toggleFAQ(index)}
            >
              <button className="flex items-center justify-between w-full p-6 text-left">
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`px-6 pb-6 transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {/* Removed the contact support text */}
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