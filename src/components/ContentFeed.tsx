
import React, { useEffect, useState } from 'react';
import ContentCard, { type ContentItem } from './ContentCard';
import { useEmotion } from '@/contexts/EmotionContext';
import { motion } from 'framer-motion';
import LoadingFeed from './LoadingFeed';
import { getFilteredContent } from '@/utils/contentUtils';
import { mockContent } from '@/data/mockContent';
import { potentiallyTriggering } from '@/data/potentiallyTriggeringContent';
import { emotionSpecificContent } from '@/data/emotionSpecificContent';

const ContentFeed: React.FC = () => {
  const { selectedEmotion } = useEmotion();
  const [feedContent, setFeedContent] = useState<ContentItem[]>(mockContent);
  
  useEffect(() => {
    const filteredContent = getFilteredContent(
      selectedEmotion,
      mockContent,
      potentiallyTriggering,
      emotionSpecificContent
    );
    
    setFeedContent(filteredContent);
  }, [selectedEmotion]);

  if (feedContent.length === 0) {
    return <LoadingFeed />;
  }

  return (
    <motion.div 
      className="max-w-md mx-auto py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {feedContent.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </motion.div>
  );
};

export default ContentFeed;
