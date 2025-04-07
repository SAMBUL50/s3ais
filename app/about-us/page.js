"use client";

import { motion } from "framer-motion";
import { Bot, Users, GraduationCap, Code2, Rocket } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Sambul",
      role: "AI/Backend Developer",
      bio: "Built the core interview AI and scoring system.",
    },
    {
      name: "Saif",
      role: "Frontend Developer",
      bio: "Designed this dashboard and user experience.",
    },
    {
      name: "Shahid",
      role: "Content & Research",
      bio: "Curated industry-specific questions and feedback templates.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/20 rounded-full filter blur-[100px]"></div>
      </div>ā

      <div className="w-full px-4 py-16 mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 border rounded-full border-blue-700/30 bg-blue-900/50">
            <Rocket className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 sm:text-5xl">
            About Our Project
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            A college initiative to democratize interview preparation through AI.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 mb-16 border bg-gray-900/50 backdrop-blur-sm rounded-xl border-blue-700/30"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <h2 className="flex items-center gap-3 mb-4 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                <Bot className="text-blue-400" />
                Why We Built This
              </h2>
              <p className="mb-4 text-gray-300">
                As computer science students, we noticed how many qualified candidates struggle with interviews due to lack of practice. Traditional mock interviews are expensive and time-consuming.
              </p>
              <p className="text-gray-300">
                Our AI coach provides <span className="text-blue-300">instant feedback</span> on your answers, <span className="text-cyan-300">industry-specific questions</span>, and <span className="text-blue-200">progress tracking</span> - all for free.
              </p>
            </div>
            <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center h-64 rounded-lg shadow-lg"></div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="flex items-center justify-center gap-3 mb-12 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            <Users className="text-blue-400" />
            Meet The Team
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div 
                key={index}
                className="p-6 transition-all border bg-gray-900/50 backdrop-blur-sm rounded-xl border-blue-700/30 hover:bg-gray-800/70"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20">
                  <span className="text-2xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-center text-white">
                  {member.name}
                </h3>
                <p className="mb-3 text-center text-blue-300">{member.role}</p>
                <p className="text-center text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* College Project Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-6 text-center border border-blue-700/30 bg-gray-900/50 backdrop-blur-sm rounded-xl"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-900/40">
            <GraduationCap className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Computer Science Project
          </h3>
          <p className="max-w-2xl mx-auto text-gray-300">
            Developed as part of our 2 year curriculum at Shadan College of Engineering & Technology
            , combining our skills in AI, web development, and UX design.
          </p>
        </motion.div>
      </div>
    </div>
  );
}