'use client'
import { useState } from 'react'
import { 
  Book, 
  Code, 
  PenTool, 
  Target, 
  FileText, 
  Globe, 
  Award, 
  Brain,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import HeroSection from './dashboard/_components/HeroSection'
import Features from '@/components/Features'
import TargetAudience from '@/components/TargetAudience'
import Faq from '@/components/Fax'
import Testimonials from '@/components/Testomonials'
const ResourceCard = ({ icon, title, description, links }) => (
  <div className="flex flex-col h-full p-6 transition-all duration-300 transform bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-2">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="flex-grow mb-4 text-gray-600">{description}</p>
    <div className="space-y-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-indigo-600 transition-colors group hover:text-indigo-800"
        >
          {link.name}
          <ArrowRight 
            className="w-4 h-4 ml-2 transition-opacity opacity-0 group-hover:opacity-100" 
          />
        </a>
      ))}
    </div>
  </div>
)

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      icon: <Code className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Coding Platforms",
          description: "Practice coding and algorithmic problem-solving",
          icon: <Code className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
            { name: "LeetCode", url: "https://leetcode.com/" },
            { name: "HackerRank", url: "https://www.hackerrank.com/" },
            { name: "CodeChef", url: "https://www.codechef.com/" }
          ]
        },
        {
          title: "Technical Interview Preparation",
          description: "Resources for system design and technical interviews",
          icon: <Target className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "InterviewBit", url: "https://www.interviewbit.com/" },
            { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { name: "Pramp", url: "https://www.pramp.com/" }
          ]
        }
      ]
    },
    aptitude: {
      icon: <Brain className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Aptitude & Reasoning",
          description: "Practice quantitative and logical reasoning skills",
          icon: <PenTool className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "IndiaBix", url: "https://www.indiabix.com/" },
            { name: "Freshersworld Aptitude", url: "https://www.freshersworld.com/aptitude-questions" },
            { name: "MathsGuru Reasoning", url: "https://www.mathsguru.com/reasoning-questions/" }
          ]
        },
        {
          title: "Competitive Exam Prep",
          description: "Resources for competitive and placement exams",
          icon: <Award className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "GATE Overflow", url: "https://gateoverflow.in/" },
            { name: "Career Power", url: "https://careerpower.in/" },
            { name: "Brilliant.org", url: "https://brilliant.org/" }
          ]
        }
      ]
    },
    interview: {
      icon: <FileText className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Interview Guides",
          description: "Comprehensive interview preparation resources",
          icon: <Book className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Insider Tips", url: "https://www.ambitionbox.com/" },
            { name: "InterviewStreet", url: "https://www.interviewstreet.com/" },
            { name: "Career Guidance", url: "https://www.shiksha.com/" }
          ]
        },
        {
          title: "Global Learning Platforms",
          description: "Online courses and learning resources",
          icon: <Globe className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Coursera", url: "https://www.coursera.org/" },
            { name: "edX", url: "https://www.edx.org/" },
            { name: "Udacity", url: "https://www.udacity.com/" }
          ]
        }
      ]
    }
  }

  return (
    <>
    <HeroSection />
  
    <TargetAudience />
    <Features />
    <Faq />
    <Testimonials />
    </>
  )
}