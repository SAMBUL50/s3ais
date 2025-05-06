'use client'

import { useState } from 'react'

export default function HeroSection() {
  return (
    <div className="relative flex items-center w-full min-h-screen overflow-hidden text-white" 
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

      <div className="relative w-full pt-20 isolate">
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 50%)'
          }}
        />

        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-28 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
            <div className="relative px-4 py-2 text-sm leading-6 text-blue-300 transition-all duration-300 rounded-full ring-1 ring-blue-700/30 hover:ring-blue-700/50 bg-blue-900/20 backdrop-blur-sm">
              How to use this AI interview mocker{' '}
              <a href="/how-it-works" className="font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 w-full text-center lg:text-left">
            <div className="flex justify-center mb-5 lg:justify-start sm:hidden">
              <a href="/how-it-works" className="relative block">
                <div className="px-3 py-1.5 text-xs leading-6 text-blue-300 rounded-full ring-1 ring-blue-700/30 bg-blue-900/20 backdrop-blur-sm max-w-[250px] hover:ring-blue-700/50 transition-all duration-300">
                  How to use this AI interview mocker
                  <span className="ml-1 font-semibold text-blue-400">→</span>
                </div>
              </a>
            </div>
            
            <div className="lg:max-w-[50%] xl:max-w-[60%]">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
                Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AI Interview Coach</span>
              </h1>
              <p className="max-w-md mx-auto mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8 sm:text-xl sm:max-w-2xl lg:mx-0">
                Double your chances of landing that job offer with our AI-powered interview prep
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row lg:items-start lg:justify-start sm:mt-10 sm:gap-x-6">
                <a
                  href="/dashboard"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-lg sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </a>
                <a 
                  href="/how-it-works" 
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold leading-6 text-gray-300 transition-colors duration-200 border border-gray-700 rounded-lg sm:w-auto hover:text-white hover:border-gray-500"
                >
                  Learn more <span aria-hidden="true" className="ml-1">→</span>
                </a>
              </div>
            </div>
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

        <div className="absolute top-[10%] right-0 w-[45%] h-[80%] -z-10 transform-gpu hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80" 
            alt="Professional Interview" 
            className="object-cover w-full h-full shadow-2xl rounded-l-3xl opacity-20"
            style={{
              clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-transparent to-transparent rounded-l-3xl"></div>
        </div>

        <div className="absolute top-[20%] -right-16 w-[60%] h-[60%] -z-10 transform-gpu hidden md:block lg:hidden">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80" 
            alt="Professional Interview" 
            className="object-cover w-full h-full shadow-2xl rounded-l-3xl opacity-20"
            style={{
              clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-transparent to-transparent rounded-l-3xl"></div>
        </div>

        <div className="absolute inset-0 -z-10 md:hidden opacity-10">
          <div className="absolute right-0 top-[20%] w-full h-[40%]"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to right, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black)'
            }}
          />
          <div className="absolute left-0 bottom-[10%] w-full h-[30%]"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwaW50ZXJ2aWV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to left, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to left, transparent, black)'
            }}
          />
        </div>

        <div aria-hidden="true" className="absolute w-32 h-32 rounded-full -bottom-20 right-1/4 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 to-purple-700 opacity-20 blur-xl"></div>
        <div aria-hidden="true" className="absolute w-40 h-40 rounded-full -top-10 left-1/4 sm:w-52 sm:h-52 bg-gradient-to-br from-blue-300 to-blue-700 opacity-10 blur-3xl"></div>
      </div>
    </div>
  )
}
