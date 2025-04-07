"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard"

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

   
    setInterviewList(result)
  };
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 gap-5 my-3 md:grid-cols-2 lg:grid-cols-3">
        {InterviewList && InterviewList.length > 0 ? (
          InterviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <div className="p-6 text-center border rounded-lg col-span-full border-gray-700/30 bg-gray-800/50 backdrop-blur-sm">
            <p className="text-gray-300">No previous interviews found. Start your first mock interview to see results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;