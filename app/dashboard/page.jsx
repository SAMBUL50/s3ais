"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Bot, Plus, ListChecks, Trophy, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-teal-300" />,
      title: "Total Interviews",
      value: "0",
    },
    {
      icon: <Trophy size={32} className="text-amber-300" />,
      title: "Best Score",
      value: "N/A",
    },
    {
      icon: <TrendingUp size={32} className="text-cyan-300" />,
      title: "Improvement Rate",
      value: "0%",
    },
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("User email not found");
      return;
    }

    try {
      const response = await fetch("/api/fetchUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch interview data");
      }

      const data = await response.json();
      const userSpecificInterviews = data.userAnswers.filter(
        (interview) =>
          interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);

      const totalInterviews = userSpecificInterviews.length;
      const bestScore =
        totalInterviews > 0
          ? Math.max(
              ...userSpecificInterviews.map((item) =>
                parseInt(item.rating || "0")
              )
            )
          : 0;
      const improvementRate = calculateImprovementRate(userSpecificInterviews);

      setStatsCards([
        {
          ...statsCards[0],
          value: totalInterviews.toString(),
        },
        {
          ...statsCards[1],
          value: bestScore ? `${bestScore}/10` : "N/A",
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%`,
        },
      ]);

      if (totalInterviews > 0) {
        toast.success(`Loaded ${totalInterviews} interview(s)`);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error(error.message || "Failed to fetch interviews");
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;

    const scores = interviews
      .map((interview) => parseInt(interview.rating || "0"))
      .sort((a, b) => a - b);

    const improvement =
      ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="relative w-full overflow-hidden" 
      style={{
        background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
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

      <div className="w-full px-4 py-8 mx-auto">
        {/* User Greeting */}
        <div className="flex flex-col items-center justify-between mb-8 space-y-4 sm:flex-row sm:space-y-0">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              <Bot className="text-indigo-600" size={32} />
              Dashboard
            </h2>
            <h3 className="mt-2 text-lg text-gray-300 sm:text-xl">
              Welcome, {user?.firstName || 'Interviewer'}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 sm:text-base">
              {user?.primaryEmailAddress?.emailAddress || 'Not logged in'}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
          {statsCards.map((card) => (
            <div 
              key={card.title}
              className="flex items-center p-4 transition-all border rounded-lg shadow-lg bg-gray-800/70 backdrop-blur-sm sm:p-6 hover:shadow-xl border-gray-700/30"
            >
              {card.icon}
              <div className="ml-4">
                <p className="text-xs text-gray-400 sm:text-sm">{card.title}</p>
                <p className="text-xl font-bold text-white sm:text-2xl">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interview Section */}
        <div className="p-4 border rounded-lg bg-gray-900/50 backdrop-blur-sm sm:p-6 border-gray-700/30">
          <div className="flex flex-col items-center justify-between mb-6 space-y-4 sm:flex-row sm:space-y-0">
            <h2 className="flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
              <Zap size={24} className="text-yellow-500" />
              Create AI Mock Interview
            </h2>
            <button 
              onClick={() => setIsNewInterviewModalOpen(true)}
              className="flex items-center px-4 py-2 text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
            >
              <Plus size={20} className="mr-2" />
              New Interview
            </button>
          </div>

          {/* Add New Interview Component */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <AddNewInterview 
              isOpen={isNewInterviewModalOpen} 
              onClose={() => setIsNewInterviewModalOpen(false)} 
            />
          </div>
        </div>

       {/* Interview History */}
       <div className="mt-8 mb-12">
          <h2 className="mb-6 text-xl font-semibold text-white sm:text-2xl">
            Interview History
          </h2>
          <div className="p-4 border rounded-lg bg-gray-900/30 backdrop-blur-sm border-gray-700/30">
            <InterviewList interviews={interviewData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;