
import React, { useState } from 'react';
import { useEmotion } from '@/contexts/EmotionContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import TriggerWarning from './TriggerWarning';

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
  
  const handleLike = () => {
    setIsLiked(!isLiked);
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" 
                 viewBox="0 0 20 20" fill={isLiked ? "currentColor" : "none"} 
                 stroke="currentColor" strokeWidth={isLiked ? "0" : "1.5"}>
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
        
        <div className="text-sm font-medium mb-1">{isLiked ? content.likes + 1 : content.likes} likes</div>
        
        <div className="mb-2">
          <span className="font-medium text-sm mr-2">{content.username}</span>
          <span className="text-sm">{content.caption}</span>
        </div>
        
        <div className="text-xs text-gray-500 mb-2">View all {content.comments} comments</div>
        
        {content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {content.tags.map(tag => (
              <span key={tag} className="text-xs text-blue-500">#{tag} </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentCard;
