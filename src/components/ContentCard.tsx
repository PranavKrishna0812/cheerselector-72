
import React, { useState } from 'react';
import { useEmotion } from '@/contexts/EmotionContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, UserPlus } from 'lucide-react';
import TriggerWarning from './TriggerWarning';
import CommentSection from './CommentSection';
import { toast } from "sonner";

export interface ContentItem {
  id: string;
  username: string;
  userAvatar: string;
  timeAgo: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  triggerWarning?: boolean;
  triggerType?: string;
}

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { selectedEmotion } = useEmotion();
  const [isLiked, setIsLiked] = useState(false);
  const [showContent, setShowContent] = useState(!content.triggerWarning);
  const [isShowingWarning, setIsShowingWarning] = useState(content.triggerWarning);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast(`Now following ${content.username}`, {
        description: "You'll see their posts in your feed.",
        duration: 3000,
      });
    } else {
      toast(`Unfollowed ${content.username}`, {
        duration: 2000,
      });
    }
  };
  
  const handleShowContent = () => {
    setShowContent(true);
    setIsShowingWarning(false);
  };
  
  const handleSkipContent = () => {
    setIsShowingWarning(false);
  };

  if (isShowingWarning) {
    return (
      <TriggerWarning 
        type={content.triggerType || 'content'} 
        onShow={handleShowContent} 
        onSkip={handleSkipContent} 
      />
    );
  }
  
  if (!showContent) {
    return null;
  }

  return (
    <motion.div 
      className="glass-card overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src={content.userAvatar} alt={content.username} />
              <AvatarFallback>{content.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{content.username}</div>
              <div className="text-xs text-gray-500">{content.timeAgo}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`text-xs px-3 py-1 h-7 rounded-full ${isFollowing ? 'bg-blue-50 text-blue-500 border-blue-200' : ''}`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : (
                <>
                  <UserPlus className="h-3 w-3 mr-1" />
                  Follow
                </>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={content.image} 
          alt={content.caption} 
          className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-700"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <button 
            className={`transition-transform duration-300 ${isLiked ? 'text-red-500 scale-110' : 'text-gray-700'}`} 
            onClick={handleLike}
          >
            <Heart className="h-7 w-7" fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button className="text-gray-700">
            <MessageSquare className="h-7 w-7" />
          </button>
          <button className="text-gray-700">
            <Send className="h-7 w-7" />
          </button>
          <div className="ml-auto">
            <MoreHorizontal className="h-7 w-7" />
          </div>
        </div>
        
        <div className="text-sm font-medium mb-1">{isLiked ? content.likes + 1 : content.likes} likes</div>
        
        <div className="mb-2">
          <span className="font-medium text-sm mr-2">{content.username}</span>
          <span className="text-sm">{content.caption}</span>
        </div>
        
        {content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {content.tags.map(tag => (
              <span key={tag} className="text-xs text-blue-500">#{tag} </span>
            ))}
          </div>
        )}
        
        <CommentSection postId={content.id} />
      </div>
    </motion.div>
  );
};

export default ContentCard;
