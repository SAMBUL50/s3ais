"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff, Save, Volume2, Info } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);
  const [usingFallbackMethod, setUsingFallbackMethod] = useState(false);

  useEffect(() => {
    // Speech recognition setup
    if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }

        if (finalTranscript.trim()) {
          setUserAnswer(prev => (prev + ' ' + finalTranscript).trim());
        }
      };

      recognition.onerror = (event) => {
        toast.error(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Add this effect to automatically enable the webcam when the component mounts
  useEffect(() => {
    // Wait a short moment to ensure the component is fully mounted
    const timer = setTimeout(() => {
      // Check if webcam is not already enabled
      if (!webcamEnabled) {
        console.log("Auto-enabling webcam on component mount");
        EnableWebcam();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Clear answer when moving to a new question
  useEffect(() => {
    setUserAnswer("");
  }, [activeQuestionIndex]);

  // Check browser compatibility with getUserMedia
  useEffect(() => {
    const checkBrowserCompatibility = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error(
          "Your browser doesn't support webcam access", 
          { description: "Try using a modern browser like Chrome, Firefox, or Edge" }
        );
        return false;
      }
      return true;
    };
    
    checkBrowserCompatibility();
  }, []);

  const checkCameraAccess = () => {
    // Check if we have access to the necessary APIs
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Your browser doesn't support webcam access");
      return false;
    }
    
    // Check available devices
    if (navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          if (videoDevices.length === 0) {
            toast.error("No camera detected on your device");
            return false;
          }
          return true;
        })
        .catch(error => {
          console.error("Error checking devices:", error);
          return true; // Continue anyway, might still work
        });
    }
    
    return true; // Default to allowing access attempt
  };

  const EnableWebcam = () => {
    // First check if we have camera access
    if (!checkCameraAccess()) {
      return;
    }
    
    // Basic video only constraint
    console.log('Attempting to enable webcam');
    navigator.mediaDevices.getUserMedia({ 
      video: true,
      audio: false
    })
    .then(function(stream) {
      // Assign stream directly to video element
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        webcamRef.current.muted = true;
        
        // Set state immediately
        setWebcamEnabled(true);
        console.log('Webcam stream obtained successfully');
        toast.success("Camera enabled");
      }
    })
    .catch(function(err) {
      console.error('Failed to obtain webcam stream:', err.name, err.message);
      
      // Try the legacy method as a fallback
      console.log("Trying fallback camera method...");
      EnableWebcamLegacy();
    });
  };
  
  const DisableWebcam = () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      // Stop all tracks
      const tracks = webcamRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      
      // Clear the source
      webcamRef.current.srcObject = null;
    }
    
    // Always update state
    setWebcamEnabled(false);
  };

  const StartStopRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech-to-text not supported");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      toast.info("Recording stopped");
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info("Recording started");
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '').trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);

      const answerRecord = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      onAnswerSave?.(answerRecord);

      toast.success("Answer recorded successfully");
      
      setUserAnswer("");
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (error) {
      toast.error("Failed to save answer", {
        description: error.message
      });
      console.error("Answer save error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup resources when component unmounts
  useEffect(() => {
    // Return cleanup function
    return () => {
      // Stop speech recognition if active
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      
      // Stop webcam if active
      if (webcamRef.current && webcamRef.current.srcObject) {
        try {
          const tracks = webcamRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          webcamRef.current.srcObject = null;
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, []);

  const EnableWebcamLegacy = async () => {
    try {
      setUsingFallbackMethod(true);
      
      // Use the most basic approach possible
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 320,
          height: 240
        }
      });
      
      // Directly set the stream
      webcamRef.current.srcObject = stream;
      
      // Set state immediately
      setWebcamEnabled(true);
      toast.success("Camera enabled using alternative method");
    } catch (error) {
      console.error("Legacy webcam approach failed:", error);
      toast.error("Camera access failed", {
        description: "Please check your browser settings"
      });
      setWebcamEnabled(false);
      setUsingFallbackMethod(false);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative p-8 border shadow-lg rounded-xl bg-gray-900/90 border-blue-700/30">
            <div className="absolute rounded-full -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-xl"></div>
            <div className="relative flex flex-col items-center">
              <Loader2 className="mb-5 text-transparent w-14 h-14 animate-spin bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300" />
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Analyzing your answer
              </p>
              <p className="mt-2 text-sm text-gray-400">Our AI is reviewing your interview response</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full overflow-hidden border shadow-lg bg-gray-900/80 backdrop-blur-sm rounded-xl border-gray-800/50"
        style={{
          background: 'linear-gradient(145deg, rgba(10, 25, 47, 0.8) 0%, rgba(17, 34, 64, 0.8) 100%)',
        }}>
        <div className="p-5 border-b bg-gradient-to-r from-blue-900/60 to-blue-800/40 border-blue-800/30">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Record Your Answer
          </h3>
          <p className="mt-1 text-gray-400">Use your microphone to record your response</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Webcam section */}
            <div>
              {!webcamEnabled ? (
                <div className="flex items-center justify-center border border-gray-700/50 rounded-xl aspect-video bg-gray-800/80">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-3 border border-gray-600 rounded-full bg-gray-800/50">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-300">Camera is currently disabled</p>
                    <p className="mt-1 text-xs text-gray-500">Camera will automatically enable when needed</p>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-black border-2 border-blue-600/30 rounded-xl aspect-video">
                  <video 
                    ref={webcamRef} 
                    autoPlay 
                    playsInline
                    width="100%"
                    height="100%"
                    muted
                    className="absolute inset-0 object-cover w-full h-full"
                    onCanPlay={() => {
                      // Manually trigger play when data is available (helps in some browsers)
                      if (webcamRef.current) {
                        webcamRef.current.play()
                          .catch(e => console.error("Error playing video:", e));
                      }
                    }}
                  />
                  {isRecording && (
                    <div className="absolute flex items-center gap-2 px-2 py-1 text-xs font-medium text-white rounded-full top-3 right-3 bg-red-500/70">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Recording
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={webcamEnabled ? "destructive" : "outline"} 
                className={`flex-1 ${webcamEnabled 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700' 
                  : 'bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 border-blue-700/50'}`}
                onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
              >
                {webcamEnabled ? (
                  <>
                    <CameraOff className="w-4 h-4 mr-2" /> Disable Camera
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" /> Enable Camera
                  </>
                )}
              </Button>
              
              <Button
                disabled={loading}
                variant="outline"
                className={`flex-1 ${isRecording 
                  ? 'bg-red-900/20 border-red-700/50 hover:bg-red-800/30 text-red-400' 
                  : 'bg-blue-900/20 border-blue-700/50 hover:bg-blue-800/30 text-blue-300'}`}
                onClick={StartStopRecording}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="w-4 h-4 mr-2 animate-pulse" /> 
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" /> 
                    Start Recording
                  </>
                )}
              </Button>
            </div>

            {/* Answer section */}
            <div className="p-4 border rounded-lg bg-gray-800/40 border-gray-700/30">
              <h4 className="mb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                Your Answer
              </h4>
              <textarea
                className="w-full h-32 p-4 text-gray-200 border rounded-lg bg-gray-800/50 border-gray-700/30 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-gray-500"
                placeholder="Your answer will appear here as you speak..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                style={{ resize: "vertical", minHeight: "8rem" }}
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <Button
                className="px-6 py-2 text-white transition-all duration-300 shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
                onClick={UpdateUserAnswer}
                disabled={loading || !userAnswer.trim()}
              >
                <Save className="w-4 h-4 mr-2" /> 
                Save Answer
              </Button>
            </div>

            {/* Webcam Debugging Section */}
            <div className="p-4 mt-4 border rounded-lg border-gray-700/30 bg-gray-800/20">
              <details>
                <summary className="flex items-center text-sm font-medium text-gray-400 cursor-pointer">
                  <Info className="w-4 h-4 mr-2" /> Camera Troubleshooting 
                  {webcamEnabled && <span className="ml-2 px-2 py-0.5 text-xs bg-green-900/50 text-green-400 rounded-full">Camera Active</span>}
                  {!webcamEnabled && <span className="ml-2 px-2 py-0.5 text-xs bg-red-900/50 text-red-400 rounded-full">Camera Inactive</span>}
                </summary>
                <div className="mt-3 space-y-3 text-xs text-gray-400">
                  <div className="p-2 border rounded bg-gray-900/50 border-gray-700/50">
                    <h5 className="mb-1 font-medium text-gray-300">Camera Status</h5>
                    <ul className="pl-1 space-y-1 list-disc list-inside">
                      <li>Camera enabled: <span className={webcamEnabled ? "text-green-400" : "text-red-400"}>
                        {webcamEnabled ? "Yes" : "No"}
                      </span></li>
                      <li>Using fallback method: <span className={usingFallbackMethod ? "text-yellow-400" : "text-gray-400"}>
                        {usingFallbackMethod ? "Yes" : "No"}
                      </span></li>
                      <li>Video ref available: <span className={webcamRef.current ? "text-green-400" : "text-red-400"}>
                        {webcamRef.current ? "Yes" : "No"}
                      </span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="mb-1 font-medium text-gray-300">If you see a black screen:</h5>
                    <ol className="pl-1 space-y-1 list-decimal list-inside">
                      <li>Check that you've granted camera permissions in your browser</li>
                      <li>The camera should enable automatically when the interview starts</li>
                      <li>Make sure no other app is using your camera</li>
                      <li>Try clicking the "Reset Camera" button below</li>
                      <li>Try refreshing the page</li>
                    </ol>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => {
                        DisableWebcam();
                        setTimeout(() => {
                          EnableWebcam();
                        }, 500);
                      }}
                    >
                      Reset Camera
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => {
                        navigator.mediaDevices.getUserMedia({video: true})
                          .then(() => {
                            toast.success("Camera permission granted");
                          })
                          .catch(err => {
                            toast.error(`Camera permission error: ${err.name}`);
                          });
                      }}
                    >
                      Test Camera Permissions
                    </Button>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordAnswerSection;