
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MessageSquare, Send } from "lucide-react";

interface Comment {
  id: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // Create a new comment
    const comment: Comment = {
      id: Date.now().toString(),
      username: 'current_user', // In a real app, this would be the current user
      userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    // Check for sad or breakup related content
    const sadKeywords = ['sad', 'depressed', 'heartbroken', 'lonely', 'breakup', 'relate to this sadness', 'i am sad'];
    
    const containsSadContent = sadKeywords.some(keyword => 
      newComment.toLowerCase().includes(keyword)
    );
    
    if (containsSadContent) {
      // Show AI response after a brief delay
      setTimeout(() => {
        toast("Emotigram AI", {
          description: "I noticed you might be feeling down. Remember that it's okay to not be okay sometimes. Would you like to see more uplifting content?",
          duration: 8000,
        });
      }, 1000);
    }
  };
  
  const toggleComments = () => {
    setIsCommenting(!isCommenting);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 flex items-center gap-1" 
          onClick={toggleComments}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{comments.length} comments</span>
        </Button>
      </div>
      
      {isCommenting && (
        <>
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start mb-2">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={comment.userAvatar} alt={comment.username} />
                <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs">{comment.username}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
          
          <div className="flex items-center mt-3">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop" alt="current_user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="rounded-full text-sm py-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="ml-1" 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSection;
