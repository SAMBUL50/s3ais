'use client'

import { useState } from 'react'

export default function AudienceSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const userTypes = [
    {
      id: 1,
      title: "Job Seekers",
      description: "Prepare for your dream job with AI-powered mock interviews and personalized feedback",
      icon: "👔",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Fresh Graduates",
      description: "Gain confidence and stand out in your first professional interviews",
      icon: "🎓",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Career Switchers",
      description: "Transition smoothly to a new field with industry-specific interview preparation",
      icon: "🔄",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "HR Teams",
      description: "Train your recruitment teams with realistic interview simulations",
      icon: "👥",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-[#0a192f] to-[#112240]"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20"
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
            Who Benefits From Our Platform
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
            Our AI interview coach is designed to help professionals at every career stage
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {userTypes.map((user) => (
            <div 
              key={user.id}
              className={`relative overflow-hidden transition-all duration-300 rounded-2xl group ${hoveredCard === user.id ? 'scale-105' : 'scale-100'}`}
              onMouseEnter={() => setHoveredCard(user.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 -z-10">
                <img 
                  src={user.image} 
                  alt={user.title} 
                  className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 to-transparent opacity-80"></div>
              </div>
              
              <div className="relative flex flex-col justify-end h-64 p-6">
                <div className="absolute text-4xl top-6 left-6">{user.icon}</div>
                <h3 className="text-2xl font-bold text-white">{user.title}</h3>
                <p className="mt-2 text-gray-300">{user.description}</p>
                <div className="absolute inset-0 transition-all duration-300 rounded-2xl ring-1 ring-inset ring-blue-500/20 group-hover:ring-blue-500/50"></div>
                <div 
                  className="absolute transition-all duration-300 opacity-0 -inset-1 -z-10 rounded-2xl group-hover:opacity-30 blur-md"
                  style={{
                    background: 'linear-gradient(90deg, rgba(56,189,248,0.5) 0%, rgba(103,232,249,0.3) 100%)'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute w-64 h-64 -top-32 -right-32 -z-10">
        <div className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(251deg, #ccff02 74.22%, #59ffcd 89.57%)',
            filter: 'blur(80px)',
            opacity: '0.1'
          }}
        />
      </div>

      <div className="absolute -bottom-40 -left-32 w-80 h-80 -z-10">
        <div className="w-full h-full rounded-full" 
          style={{
            background: 'linear-gradient(80deg, #87c0ff, #d6ffbd 33%, #ffe79e 69%)',
            filter: 'blur(100px)',
            opacity: '0.1'
          }}
        />
      </div>
    </div>
  )
}