"use client";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle, Sparkles } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Job Role Suggestions
const JOB_ROLE_SUGGESTIONS = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'DevOps Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Cloud Engineer',
  'Mobile App Developer',
  'UI/UX Designer'
];

// Tech Stack Suggestions
const TECH_STACK_SUGGESTIONS = {
  'Full Stack Developer': 'React, Node.js, Express, MongoDB, TypeScript',
  'Frontend Developer': 'React, Vue.js, Angular, TypeScript, Tailwind CSS',
  'Backend Developer': 'Python, Django, Flask, Java Spring, PostgreSQL',
  'Software Engineer': 'Java, C++, Python, AWS, Microservices',
  'DevOps Engineer': 'Docker, Kubernetes, Jenkins, AWS, Azure',
  'Data Scientist': 'Python, TensorFlow, PyTorch, Pandas, NumPy',
  'Machine Learning Engineer': 'Python, scikit-learn, Keras, TensorFlow',
  'Cloud Engineer': 'AWS, Azure, GCP, Terraform, Kubernetes',
  'Mobile App Developer': 'React Native, Flutter, Swift, Kotlin',
  'UI/UX Designer': 'Figma, Sketch, Adobe XD, InVision'
};

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Auto-suggest tech stack based on job role
  const autoSuggestTechStack = (role) => {
    const suggestion = TECH_STACK_SUGGESTIONS[role];
    if (suggestion) {
      setJobDescription(suggestion);
      toast.info(`Auto-filled tech stack for ${role}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}.
    Generate 5 interview questions and answers in JSON format.`;
  
    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      
      const cleanedResponse = responseText.replace(/```json\n?|```/g, '').trim();
      
      const mockResponse = JSON.parse(cleanedResponse);
      
      const res = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });
      
      toast.success('Interview questions generated successfully!');
      router.push(`dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Error generating interview:", error);
      toast.error('Failed to generate interview questions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-8 transition-all border rounded-lg cursor-pointer bg-gray-800/70 backdrop-blur-sm border-gray-700/30 hover:shadow-xl hover:bg-gray-800/90 group"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <div className="flex items-center justify-center w-12 h-12 transition-transform transform rounded-full bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-110">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Create New Interview</h1>
          <p className="text-sm text-center text-gray-400">Start your AI-powered interview preparation</p>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-gray-900 border shadow-2xl border-gray-700/30">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="relative hidden bg-gray-800 md:block md:w-2/5">
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-900/80 to-gray-900/90 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional interview" 
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-400 to-cyan-300 shadow-blue-500/20">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-white">Prepare for Success</h2>
                <p className="text-sm text-gray-300">Our AI-powered interview system will generate personalized questions based on your experience and tech stack</p>
                <div className="absolute left-0 right-0 flex justify-center space-x-1 bottom-8">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="p-6 md:w-3/5">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Create Your Interview Preparation
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Configure your custom interview settings below to get started with your personalized AI interview.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">Job Role/Position</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        value={jobPosition}
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                        list="jobRoles"
                        className="text-white border border-gray-700 bg-gray-800/60 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <datalist id="jobRoles">
                        {JOB_ROLE_SUGGESTIONS.map(role => (
                          <option key={role} value={role} />
                        ))}
                      </datalist>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => autoSuggestTechStack(jobPosition)}
                        disabled={!jobPosition}
                        className="text-blue-400 bg-gray-800 hover:bg-gray-700 hover:text-blue-300"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">Select from common job roles or enter your own</p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex. Next.js, React.js, Tailwind CSS, TypeScript, MongoDB"
                      value={jobDescription}
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="bg-gray-800/60 border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    />
                    <p className="mt-1 text-xs text-gray-400">Include relevant technologies and skills for more targeted questions</p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="70"
                      value={jobExperience}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="text-white border border-gray-700 bg-gray-800/60 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">Questions will be adapted to your experience level</p>
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700/50">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setOpenDialog(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 animate-spin" /> Generating
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;