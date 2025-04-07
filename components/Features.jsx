'use client'

import { useState } from 'react'

export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      title: "Personalized Feedback",
      description: "Receive AI-powered analysis of your answers, including tone, content, and delivery",
      icon: "💡",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rightContent: "Our AI analyzes every aspect of your response, from keywords used to vocal patterns, giving you actionable insights to improve your interview performance."
    },
    {
      id: 2,
      title: "Industry-Specific Questions",
      description: "Practice with questions tailored to your target role and company",
      icon: "📊",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rightContent: "Access question banks for over 50 industries and 1000+ companies to practice the most relevant scenarios you'll face in real interviews."
    },
    {
      id: 3,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed analytics",
      icon: "📈",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rightContent: "Visual dashboards show your improvement across key metrics like confidence, clarity, and response time, helping you track your journey."
    }
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-[#112240] to-[#1a365d]"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      
      <div className="absolute inset-0 -z-10 opacity-20">
        <div 
          className="absolute inset-0"
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
            Key Benefits
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
            Why professionals choose our AI interview platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
          {/* Images Column - Left Side */}
          <div className="space-y-8">
            {benefits.map((benefit) => (
              <div 
                key={`image-${benefit.id}`} 
                className="relative overflow-hidden transition-all duration-300 rounded-2xl h-96 group"
              >
                <img 
                  src={benefit.image} 
                  alt={benefit.title} 
                  className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-70"></div>
                <div className="absolute inset-0 transition-all duration-300 rounded-2xl ring-1 ring-inset ring-blue-500/20 group-hover:ring-blue-500/50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-gray-200">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Column - Right Side */}
          <div className="space-y-8">
            {benefits.map((benefit) => (
              <div 
                key={`content-${benefit.id}`}
                className="relative p-8 transition-all duration-300 h-96 bg-gray-900/50 rounded-2xl hover:bg-gray-900/70 backdrop-blur-sm group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-400 rounded-l-2xl"></div>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center w-16 h-16 mb-6 text-3xl text-blue-300 rounded-lg bg-blue-900/50">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-300">{benefit.rightContent}</p>
                  <div className="mt-auto">
                    
                  </div>
                </div>
                <div 
                  className="absolute transition-all duration-300 opacity-0 -inset-1 -z-10 rounded-2xl group-hover:opacity-30 blur-md"
                  style={{
                    background: 'linear-gradient(90deg, rgba(56,189,248,0.5) 0%, rgba(103,232,249,0.3) 100%)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1/3 h-full -z-10">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, rgba(10,25,47,0.8) 0%, rgba(10,25,47,0) 100%)'
          }}
        />
      </div>

      <div className="absolute w-64 h-64 -top-32 -right-32 -z-10">
        <div className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(251deg, rgba(204,255,2,0.2) 0%, rgba(89,255,205,0.2) 100%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="absolute -bottom-40 -left-32 w-80 h-80 -z-10">
        <div className="w-full h-full rounded-full" 
          style={{
            background: 'linear-gradient(80deg, rgba(135,192,255,0.1), rgba(214,255,189,0.1) 33%, rgba(255,231,158,0.1) 69%)',
            filter: 'blur(100px)'
          }}
        />
      </div>
    </div>
  )
}