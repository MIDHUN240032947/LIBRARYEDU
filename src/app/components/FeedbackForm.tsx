import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface FeedbackFormProps {
  resourceId: string;
  onSubmit?: (feedback: { rating: number; comment: string; userName: string }) => void;
}

export function FeedbackForm({ resourceId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    // Submit feedback
    onSubmit?.({ rating, comment, userName });
    toast.success("Thank you for your feedback!");
    
    // Reset form
    setRating(0);
    setComment("");
    setUserName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold text-lg mb-4">Leave Your Feedback</h3>
      
      {/* Rating */}
      <div className="mb-4">
        <Label className="mb-2 block">Your Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  value <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <Label htmlFor="userName" className="mb-2 block">
          Your Name
        </Label>
        <Input
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* Comment */}
      <div className="mb-4">
        <Label htmlFor="comment" className="mb-2 block">
          Your Feedback
        </Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this resource..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </form>
  );
}
