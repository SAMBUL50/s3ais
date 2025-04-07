"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
      // Optionally add error toast or error state handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    // Optional: Add any additional logic when an answer is saved
    // For example, you might want to automatically move to the next question
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto animate-spin" />
          <p className="mt-4 text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">No interview questions found.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-10 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      <div className="relative w-full px-4 mx-auto max-w-7xl">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-[5%] w-64 h-64 -z-10 opacity-10">
          <div className="w-full h-full rounded-full" 
            style={{
              background: 'linear-gradient(251deg, #ccff02 74.22%, #59ffcd 89.57%)',
              filter: 'blur(70px)',
            }}
          />
        </div>
        <div className="absolute bottom-20 left-[5%] w-64 h-64 -z-10 opacity-10">
          <div className="w-full h-full rounded-full" 
            style={{
              background: 'linear-gradient(80deg, #87c0ff, #d6ffbd 33%, #ffe79e 69%)',
              filter: 'blur(70px)',
            }}
          />
        </div>
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            AI Interview Session
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Answer each question thoughtfully. Your responses will be analyzed to provide personalized feedback.
          </p>
        </div>
      
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-12">
          {/* Questions Section - Takes 5/12 columns on large screens */}
          <div className="lg:col-span-5">
            <QuestionsSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
            />
          </div>
          
          {/* Recording Section - Takes 7/12 columns on large screens */}
          <div className="lg:col-span-7">
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interViewData}
              onAnswerSave={handleAnswerSave}
            />
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex flex-wrap justify-center gap-4 pb-6 mt-8 md:justify-end">
          {activeQuestionIndex > 0 && (
            <Button 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="px-6 py-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 shadow-md hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous Question
            </Button>
          )}
          
          {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
            <Button 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="px-6 py-2 text-white transition-all duration-300 shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            >
              Next Question
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          )}
          
          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
            <Link href={'/dashboard/interview/' + interViewData?.mockId + '/feedback'}>
              <Button className="px-6 py-2 text-white transition-all duration-300 shadow-md bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400">
                Complete Interview
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="w-full max-w-xl mx-auto mt-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{activeQuestionIndex + 1} of {mockInterviewQuestion?.length}</span>
          </div>
          <div className="h-2 overflow-hidden bg-gray-800 rounded-full">
            <div 
              className="h-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${((activeQuestionIndex + 1) / mockInterviewQuestion?.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;