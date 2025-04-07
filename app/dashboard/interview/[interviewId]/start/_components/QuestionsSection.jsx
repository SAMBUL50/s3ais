"use client"
import { Lightbulb, Volume2, HelpCircle } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
  const textToSpeach = (text) => {
    if('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    } else {
      alert("Sorry, your browser does not support text to speech")
    }
  }
  
  return mockInterviewQuestion && (
    <div className='w-full mb-6 overflow-hidden border shadow-lg bg-gray-900/80 backdrop-blur-sm rounded-xl border-gray-800/50'
      style={{
        background: 'linear-gradient(145deg, rgba(10, 25, 47, 0.8) 0%, rgba(17, 34, 64, 0.8) 100%)',
        boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)'
      }}>
      <div className='p-5 border-b bg-gradient-to-r from-blue-900/60 to-blue-800/40 border-blue-800/30'>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Interview Questions
        </h3>
        <p className='mt-1 text-gray-400'>Navigate through all questions in your interview</p>
      </div>
      
      <div className='p-6'>
        {/* Question Navigation */}
        <div className='grid grid-cols-2 gap-3 mb-8 md:grid-cols-4 lg:grid-cols-5'>
          {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
            <div 
              key={index}
              className={`p-2 rounded-lg text-center cursor-pointer transition-all duration-300 ${
                activeQuestionIndex === index 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                  : 'bg-gray-800/70 text-gray-300 border border-gray-700/50 hover:bg-gray-700/70'
              }`}
            >
              <span className='text-sm font-medium'>Question #{index+1}</span>
            </div>
          ))}
        </div>
          
        {/* Current Question */}
        <div className='p-5 mb-6 border rounded-xl bg-gray-800/30 border-blue-900/20'
          style={{
            background: 'linear-gradient(145deg, rgba(15, 33, 55, 0.4) 0%, rgba(17, 34, 64, 0.2) 100%)'
          }}>
          <div className='flex items-center justify-between mb-3'>
            <h4 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
              Current Question
            </h4>
            <button 
              onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
              className='flex items-center justify-center w-8 h-8 text-blue-400 transition-colors rounded-full bg-blue-900/30 hover:bg-blue-800/50'
              aria-label="Read question aloud"
            >
              <Volume2 className='w-4 h-4' />
            </button>
          </div>
          <p className='text-lg leading-relaxed text-white'>
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </p>
        </div>
          
        {/* Tips Section */}
        <div className='p-5 border rounded-xl bg-blue-900/20 backdrop-blur-sm border-blue-800/30'>
          <div className='flex items-start gap-3'>
            <div className='flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-blue-900/50'>
              <Lightbulb className='w-5 h-5 text-blue-300' />
            </div>
            <div>
              <h4 className='mb-2 font-medium text-blue-300'>Important Information</h4>
              <p className='text-sm leading-relaxed text-blue-200'>
                Enable Video Web Cam and Microphone to start your AI-powered Mock Interview. 
                You'll answer 5 questions and receive a detailed report based on your responses.
                <span className='block mt-2 font-medium'>
                  <HelpCircle className='inline-block w-4 h-4 mr-1' /> 
                  We never record your video. Webcam access can be disabled at any time.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsSection