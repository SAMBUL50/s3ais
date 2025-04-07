import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onDelete = async () => {
    try {
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview?.mockId));
      
      // Close dialog and show success toast
      setIsDialogOpen(false);
      toast.success("Interview deleted successfully");
      
      // Use router to refresh instead of full page reload
      router.refresh();
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    }
  };

  return (
    <div className="relative p-5 transition-all border rounded-lg shadow-md border-gray-700/30 bg-gray-800/70 backdrop-blur-sm hover:shadow-lg">
      {/* Delete button in the top-right corner */}
      <Button
        size="sm"
        variant="outline"
        className="absolute flex items-center justify-center bg-transparent border-gray-700 top-3 right-3 hover:bg-gray-700/50"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="w-4 h-4 text-red-400" />
      </Button>

      {/* Card Content */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{interview?.jobPosition}</h2>
        <div className="space-y-1">
          <h2 className="text-sm text-gray-300">Experience: <span className="text-white">{interview?.jobExperience} Year(s)</span></h2>
          <h2 className="text-sm text-gray-300">Created At: <span className="text-white">{interview?.createdAt}</span></h2>
        </div>
      </div>

      <div className="flex justify-between gap-5 mt-4">
        <Button size="sm" variant="outline" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-white" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400" size="sm" onClick={onStart}>
          Start
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 mx-4 bg-gray-800 border rounded-lg shadow-lg border-gray-700/30">
            <h3 className="mb-4 text-lg font-bold text-white">Confirm Deletion</h3>
            <p className="mb-6 text-gray-300">Are you sure you want to delete this interview?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="text-white bg-red-600 hover:bg-red-700"
                onClick={onDelete}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewItemCard;