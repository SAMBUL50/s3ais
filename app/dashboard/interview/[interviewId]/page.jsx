"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Interview details not found");
      }
    } catch (error) {
      toast.error("Error fetching interview details");
      console.error("Interview details fetch error:", error);
    }
  };

  const handleWebcamToggle = () => {
    if (!webCamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          setWebCamEnabled(true);
          toast.success("Webcam and microphone enabled");
        })
        .catch((error) => {
          toast.error("Failed to access webcam or microphone");
          console.error("Webcam access error:", error);
        });
    } else {
      setWebCamEnabled(false);
    }
  };

  if (!interviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)' }}>
        <div className="p-8 text-center border rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-sm border-gray-700/30">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-blue-600/30 border-t-blue-400 animate-spin"></div>
          <p className="text-gray-300">Loading interview details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(130deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
      <div className="relative w-full max-w-6xl px-4 mx-auto">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 -z-10 opacity-10">
          <div className="w-full h-full rounded-full" 
            style={{
              background: 'linear-gradient(251deg, #ccff02 74.22%, #59ffcd 89.57%)',
              filter: 'blur(70px)',
            }}
          />
        </div>
        <div className="absolute -bottom-32 left-[10%] w-64 h-64 -z-10 opacity-10">
          <div className="w-full h-full rounded-full" 
            style={{
              background: 'linear-gradient(80deg, #87c0ff, #d6ffbd 33%, #ffe79e 69%)',
              filter: 'blur(70px)',
            }}
          />
        </div>
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Let's get started</h2>
          <p className="max-w-2xl mx-auto text-gray-400">Configure your interview settings and prepare for your AI-powered interview experience.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            {/* Interview Details Card */}
            <div className="p-8 overflow-hidden border shadow-lg rounded-xl bg-gray-900/70 backdrop-blur-sm border-gray-700/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-blue-900/30 border-blue-800/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Interview Details</h3>
              </div>
              <div className="space-y-5">
                <div className="p-4 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="mb-1 text-sm font-medium text-gray-400">Job Role/Job Position</p>
                  <p className="text-lg font-medium text-white">{interviewData.jobPosition}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="mb-1 text-sm font-medium text-gray-400">Job Description/Tech Stack</p>
                  <p className="text-lg font-medium text-white">{interviewData.jobDesc}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-800/70 border-gray-700/30">
                  <p className="mb-1 text-sm font-medium text-gray-400">Years of Experience</p>
                  <p className="text-lg font-medium text-white">{interviewData.jobExperience}</p>
                </div>
              </div>
            </div>
            
            {/* Information Card */}
            <div className="p-8 overflow-hidden border shadow-lg rounded-xl bg-blue-900/20 backdrop-blur-sm border-blue-700/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-blue-500/20 border-blue-500/30">
                  <Lightbulb className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Information</h3>
              </div>
              <p className="leading-relaxed text-blue-200">
                Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview. 
                It has 5 questions which you can answer and will provide a report based on your answers.
              </p>
              <div className="p-3 mt-4 border rounded-lg bg-blue-800/20 border-blue-700/30">
                <p className="text-sm font-medium text-blue-300">
                  <span className="font-bold">NOTE:</span> We never record your video. Web cam access can be disabled at any time.
                </p>
              </div>
            </div>
          </div>
          
          {/* Camera Section */}
          <div className="flex flex-col">
            {webCamEnabled ? (
              <div className="w-full p-2 overflow-hidden shadow-xl rounded-xl bg-gray-900/90">
                <Webcam
                  mirrored={true}
                  style={{ height: 400, width: "100%", objectFit: "cover" }}
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => {
                    toast.error("Webcam access error");
                    setWebCamEnabled(false);
                  }}
                  className="rounded-lg"
                />
                <div className="mt-4 text-center">
                  <Button
                    className="px-6 py-2 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
                    onClick={handleWebcamToggle}
                  >
                    Disable Camera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="w-full overflow-hidden rounded-xl shadow-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 h-[400px] flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gray-800/70">
                    <WebcamIcon className="w-12 h-12 text-gray-500" />
                  </div>
                  <p className="mb-2 text-lg font-medium text-gray-300">Camera is currently disabled</p>
                  <p className="max-w-xs mb-8 text-center text-gray-400">Enable your camera to enhance your interview experience</p>
                  <Button
                    className="px-8 py-3 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
                    onClick={handleWebcamToggle}
                  >
                    Enable Web Cam and Microphone
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-12 md:justify-end">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="px-10 py-6 text-lg text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30 rounded-xl">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;