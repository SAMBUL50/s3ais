"use client";

import { motion } from "framer-motion";
import { Bot, Mic, BarChart2, Zap, Code, Smartphone, Award, ChevronRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Mic className="w-8 h-8 text-blue-400" />,
      title: "1. Start Your Interview",
      description: "Select from our curated question banks across 50+ industries or create a custom interview tailored to your target role. Our AI adjusts difficulty based on your experience level.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Professional woman conducting interview",
      features: [
        "50+ industry-specific question sets",
        "Custom interview builder",
        "Experience-level adaptation"
      ]
    },
    {
      icon: <Code className="w-8 h-8 text-cyan-300" />,
      title: "2. AI Analysis in Real-Time",
      description: "Our proprietary algorithms evaluate your responses across 12 key metrics including content relevance, speech clarity, and emotional tone - providing human-like assessment at machine speed.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "AI neural network visualization",
      features: [
        "Natural Language Processing",
        "Sentiment analysis",
        "Real-time evaluation"
      ]
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-blue-300" />,
      title: "3. Get Instant Feedback",
      description: "Receive comprehensive scoring with visual breakdowns across confidence, clarity, and content quality. Each metric includes actionable improvement suggestions.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Data analytics dashboard with metrics",
      features: [
        "Detailed scoring rubrics",
        "Visual performance charts",
        "Personalized coaching tips"
      ]
    },
    {
      icon: <Award className="w-8 h-8 text-cyan-400" />,
      title: "4. Track Your Progress",
      description: "Our dashboard visualizes your improvement over time, highlighting strengths and areas needing work. Compare sessions to measure your growth.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Professional celebrating success",
      features: [
        "Historical performance tracking",
        "Benchmark comparisons",
        "Personalized growth plan"
      ]
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[90px]"></div>
        <div className="absolute bottom-32 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full filter blur-[120px]"></div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 -z-10 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="w-full px-4 py-16 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 mb-6 border rounded-full border-blue-700/30 bg-blue-900/50"
          >
            <Zap className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 sm:text-5xl">
            Master Interviews with AI Guidance
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Our 4-step system transforms nervous candidates into confident professionals
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex flex-col items-center gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 border rounded-lg border-blue-700/30 bg-blue-900/50">
                    {step.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{step.title}</h2>
                </div>
                <p className="mb-6 text-lg leading-relaxed text-gray-400">
                  {step.description}
                </p>
                
                <ul className="mb-6 space-y-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <ChevronRight className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {index === 1 && (
                  <div className="p-4 border rounded-lg border-blue-700/30 bg-blue-900/30">
                    <h3 className="flex items-center gap-2 mb-2 text-sm font-medium text-cyan-300">
                      <Smartphone className="w-4 h-4" />
                      TECHNICAL INSIGHT
                    </h3>
                    <p className="text-sm text-gray-300">
                      Powered by transformer-based NLP models fine-tuned on 10,000+ interview transcripts with 93% accuracy in predicting real interview outcomes.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute transition-all duration-300 -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-md group-hover:blur-lg"></div>
                  <img 
                    src={step.image} 
                    alt={step.alt}
                    className="relative w-full rounded-xl shadow-2xl border border-blue-700/50 transition-transform group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
}