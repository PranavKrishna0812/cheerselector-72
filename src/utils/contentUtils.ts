
import { ContentItem } from '@/components/ContentCard';
import { Emotion } from '@/contexts/EmotionContext';

export const getFilteredContent = (
  selectedEmotion: Emotion | null,
  mockContent: ContentItem[],
  potentiallyTriggering: { [key: string]: ContentItem[] },
  emotionSpecificContent: { [key: string]: ContentItem[] }
): ContentItem[] => {
  if (!selectedEmotion) {
    return mockContent;
  }
  
  let newFeed: ContentItem[] = [...mockContent];
  
  // Add potentially triggering content based on specific emotions
  if (selectedEmotion.id === 'heartbroken' || selectedEmotion.id === 'stressed' || selectedEmotion.id === 'frustrated') {
    const triggeringContent = potentiallyTriggering[selectedEmotion.id] || [];
    newFeed = [...newFeed, ...triggeringContent];
  }
  
  // Add mood-enhancing content based on mood
  if (selectedEmotion.mood) {
    const enhancingContent = emotionSpecificContent[selectedEmotion.mood] || [];
    newFeed = [...enhancingContent, ...newFeed];
  }
  
  // Shuffle the feed for variety
  return newFeed.sort(() => Math.random() - 0.5);
};
