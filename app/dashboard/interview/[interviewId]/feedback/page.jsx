"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronsUpDown, 
  Activity, 
  Target 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    setLoading(false);

    // Calculate the average rating dynamically, only including valid ratings
    const validRatings = result
      .map((item) => parseFloat(item.rating))
      .filter((rating) => !isNaN(rating));

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    const avgRating = validRatings.length > 0 
      ? (totalRating / validRatings.length).toFixed(1) 
      : "N/A";

    setAverageRating(avgRating);
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600";
    if (numRating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 mx-auto text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden" 
      style={{ 
        background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      <div className="w-full max-w-full px-4 py-16 mx-auto">
        {feedbackList.length === 0 ? (
          <div className="max-w-md p-6 mx-auto overflow-hidden border rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-sm border-gray-700/30">
            <div className="text-center">
              <XCircle className="w-20 h-20 mx-auto text-red-400" />
              <h2 className="mt-6 text-2xl font-bold text-white">
                No Interview Feedback Available
              </h2>
              <p className="mt-4 mb-8 text-gray-300">
                It seems like no feedback has been generated for this interview. 
                This could be due to an incomplete interview or a system issue.
              </p>
              <Button 
                onClick={() => router.replace('/dashboard')}
                className="text-white shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-4xl p-8 mx-auto mb-10 overflow-hidden border rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-sm border-gray-700/30">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="flex items-center justify-center flex-shrink-0 w-24 h-24 border rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Interview Feedback
                  </h2>
                  <p className="mt-2 text-gray-300">
                    Review your performance and learn how to improve for your next interview
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
                <div className="p-5 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="text-sm text-gray-400">Overall Rating</p>
                  <div className="flex items-end gap-2">
                    <p className={`text-4xl font-bold ${getRatingColor(averageRating)}`}>
                      {averageRating ? `${averageRating}` : 'N/A'}
                    </p>
                    <span className="text-lg text-gray-400">/10</span>
                  </div>
                </div>
                <div className="p-5 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="text-sm text-gray-400">Total Questions</p>
                  <p className="text-4xl font-bold text-blue-400">
                    {feedbackList.length}
                  </p>
                </div>
                <div className="p-5 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="text-sm text-gray-400">Position</p>
                  <p className="text-xl font-medium text-gray-200 truncate">
                    {feedbackList[0]?.jobPosition || "Interview"}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-xl font-bold text-white">
                Detailed Question Feedback
              </h3>
              <p className="text-gray-300">
                Expand each question to see your answer, the correct answer, and personalized feedback.
              </p>

              <div className="mt-6 space-y-4">
                {feedbackList.map((item, index) => (
                  <Collapsible key={index} className="overflow-hidden border rounded-lg border-gray-700/30 bg-gray-900/70 backdrop-blur-sm">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            parseFloat(item.rating) >= 7 
                              ? "bg-green-500/20 text-green-400" 
                              : parseFloat(item.rating) >= 4 
                              ? "bg-yellow-500/20 text-yellow-400" 
                              : "bg-red-500/20 text-red-400"
                          }`}>
                            <span className="text-sm font-bold">{item.rating}</span>
                          </div>
                          <span className="font-medium text-gray-200 line-clamp-1">
                            {item.question}
                          </span>
                        </div>
                        <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-5 border-t border-gray-700/30 bg-gray-800/30">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-300">
                            <div className="p-1 rounded-full bg-red-500/20">
                              <XCircle className="w-4 h-4 text-red-400" />
                            </div>
                            Your Answer
                          </h4>
                          <div className="p-4 border rounded-lg bg-gray-800/70 border-red-500/20">
                            <p className="text-sm text-gray-300">
                              {item.userAns || "No answer provided"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-300">
                            <div className="p-1 rounded-full bg-green-500/20">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            </div>
                            Correct Answer
                          </h4>
                          <div className="p-4 border rounded-lg bg-gray-800/70 border-green-500/20">
                            <p className="text-sm text-gray-300">
                              {item.correctAns}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="flex items-center gap-2 mb-3 font-medium text-gray-300">
                          <div className="p-1 rounded-full bg-blue-500/20">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          Feedback & Improvement
                        </h4>
                        <div className="p-4 border rounded-lg bg-gray-800/70 border-blue-500/20">
                          <p className="text-sm text-gray-300">
                            {item.feedback}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <div className="flex justify-center pt-10">
                <Button 
                  onClick={() => router.replace('/dashboard')}
                  className="px-8 text-white shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;