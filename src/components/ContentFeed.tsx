import React, { useEffect, useState } from 'react';
import ContentCard, { type ContentItem } from './ContentCard';
import { useEmotion } from '@/contexts/EmotionContext';
import { motion } from 'framer-motion';

// Sample content items
const mockContent: ContentItem[] = [
  {
    id: '1',
    username: 'nature_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3',
    timeAgo: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1470&auto=format&fit=crop',
    caption: 'Found this amazing spot during my hike today! Nature is truly healing ✨',
    likes: 342,
    comments: 18,
    tags: ['nature', 'hiking', 'peaceful', 'outdoors'],
  },
  {
    id: '2',
    username: 'food_lover',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1644&auto=format&fit=crop',
    caption: 'Homemade pasta night! Making food from scratch is so satisfying.',
    likes: 189,
    comments: 23,
    tags: ['foodie', 'homemade', 'cooking', 'pasta'],
  },
  {
    id: '3',
    username: 'travel_addict',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '1 day ago',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1820&auto=format&fit=crop',
    caption: 'City lights and urban adventures 🌃',
    likes: 521,
    comments: 42,
    tags: ['travel', 'cityscape', 'adventure', 'nightlife'],
  },
  {
    id: '4',
    username: 'mindfulness_daily',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '6 hours ago',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1442&auto=format&fit=crop',
    caption: 'Take a moment to breathe and find your center. Today is a gift.',
    likes: 278,
    comments: 14,
    tags: ['mindfulness', 'meditation', 'wellness', 'mentalhealth'],
  },
  {
    id: '5',
    username: 'art_therapy',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '3 days ago',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1490&auto=format&fit=crop',
    caption: 'Art has a way of expressing what words cannot. Created this piece during a difficult time.',
    likes: 416,
    comments: 38,
    tags: ['art', 'emotionalhealing', 'expression', 'creativity'],
    triggerWarning: true,
    triggerType: 'emotional difficulty',
  },
  {
    id: '6',
    username: 'fit_journey',
    userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1616279969096-54b228f5f124?q=80&w=1470&auto=format&fit=crop',
    caption: 'Consistent progress over time leads to amazing results. Month 3 of my fitness journey!',
    likes: 633,
    comments: 57,
    tags: ['fitness', 'progress', 'motivation', 'health'],
  },
];

// Content that could be triggering based on emotional state
const potentiallyTriggering: { [key: string]: ContentItem[] } = {
  'heartbroken': [
    {
      id: '7',
      username: 'healing_heart',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '1 day ago',
      image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1470&auto=format&fit=crop',
      caption: "Going through a breakup has been tough, but I'm finding myself again day by day.",
      likes: 489,
      comments: 62,
      tags: ['breakup', 'healing', 'selflove', 'growth'],
      triggerWarning: true,
      triggerType: 'breakup content',
    }
  ],
  'stressed': [
    {
      id: '8',
      username: 'worklife_balance',
      userAvatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '2 days ago',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1470&auto=format&fit=crop',
      caption: 'Deadlines piling up. The pressure is intense but trying to stay focused.',
      likes: 302,
      comments: 47,
      tags: ['work', 'pressure', 'deadlines', 'stress'],
      triggerWarning: true,
      triggerType: 'work stress',
    }
  ],
  'frustrated': [
    {
      id: '9',
      username: 'political_observer',
      userAvatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '8 hours ago',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1470&auto=format&fit=crop',
      caption: 'Hot take on the latest political debate. This policy change is absolutely infuriating!',
      likes: 728,
      comments: 193,
      tags: ['politics', 'debate', 'controversial', 'opinion'],
      triggerWarning: true,
      triggerType: 'political debate',
    }
  ]
};

// Mood-enhancing content
const emotionSpecificContent: { [key: string]: ContentItem[] } = {
  'sad': [
    {
      id: '10',
      username: 'daily_motivation',
      userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1375&auto=format&fit=crop',
      caption: 'Even the darkest night will end and the sun will rise. Keep going! ✨',
      likes: 1207,
      comments: 83,
      tags: ['hope', 'motivation', 'positivity', 'sunrise'],
    },
    {
      id: '11',
      username: 'animal_lovers',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop',
      caption: 'Puppies always make everything better! Meet our new rescue, Buddy.',
      likes: 2389,
      comments: 154,
      tags: ['puppies', 'cute', 'rescue', 'dogs'],
    }
  ],
  'anxious': [
    {
      id: '12',
      username: 'peace_within',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '1 day ago',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1376&auto=format&fit=crop',
      caption: 'Breathing exercise: 4 counts in, hold for 7, release for 8. Repeat 5 times whenever anxiety rises.',
      likes: 561,
      comments: 42,
      tags: ['breathing', 'anxiety', 'calm', 'meditation'],
    },
    {
      id: '13',
      username: 'nature_therapy',
      userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1374&auto=format&fit=crop',
      caption: 'The gentle sound of water always calms my mind. Find your peaceful spot in nature.',
      likes: 843,
      comments: 37,
      tags: ['naturetherapy', 'water', 'peaceful', 'mindfulness'],
    }
  ],
  'angry': [
    {
      id: '14',
      username: 'humor_daily',
      userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1534804792921-ac381a8718da?q=80&w=1470&auto=format&fit=crop',
      caption: "When someone asks why you're in a bad mood... 😂",
      likes: 3721,
      comments: 208,
      tags: ['humor', 'funny', 'laughter', 'mood'],
    },
    {
      id: '15',
      username: 'boxing_life',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '4 hours ago',
      image: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1374&auto=format&fit=crop',
      caption: 'Channel that energy into something productive. Best workout for releasing tension!',
      likes: 927,
      comments: 76,
      tags: ['boxing', 'workout', 'energy', 'release'],
    }
  ],
  'happy': [
    {
      id: '16',
      username: 'celebration_moments',
      userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '7 hours ago',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop',
      caption: "Celebrating life's little victories today! What are you grateful for?",
      likes: 1543,
      comments: 127,
      tags: ['celebration', 'gratitude', 'joy', 'happiness', 'achievement'],
    },
    {
      id: '17',
      username: 'adventure_awaits',
      userAvatar: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '1 day ago',
      image: 'https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=1450&auto=format&fit=crop',
      caption: 'Say yes to new adventures! Spontaneous road trip with friends is the best therapy.',
      likes: 2189,
      comments: 93,
      tags: ['adventure', 'roadtrip', 'friends', 'spontaneous'],
    },
    {
      id: '18',
      username: 'achievement_unlocked',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
      timeAgo: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1621274282490-77c7a92476f8?q=80&w=1470&auto=format&fit=crop',
      caption: "Just got my first promotion at work! Hard work finally paid off! 🏆",
      likes: 1876,
      comments: 145,
      tags: ['achievement', 'career', 'celebration', 'success', 'trophy'],
    }
  ]
};

const ContentFeed: React.FC = () => {
  const { selectedEmotion } = useEmotion();
  const [feedContent, setFeedContent] = useState<ContentItem[]>(mockContent);
  
  useEffect(() => {
    if (!selectedEmotion) {
      setFeedContent(mockContent);
      return;
    }
    
    let newFeed: ContentItem[] = [...mockContent];
    
    // Filter out potentially triggering content based on specific emotions
    if (selectedEmotion.id === 'heartbroken' || selectedEmotion.id === 'stressed' || selectedEmotion.id === 'frustrated') {
      // Add trigger warnings to potentially triggering content
      const triggeringContent = potentiallyTriggering[selectedEmotion.id] || [];
      newFeed = [...newFeed, ...triggeringContent];
    }
    
    // Add mood-enhancing content based on mood
    if (selectedEmotion.mood) {
      const enhancingContent = emotionSpecificContent[selectedEmotion.mood] || [];
      newFeed = [...enhancingContent, ...newFeed];
    }
    
    // Shuffle the feed for variety
    newFeed.sort(() => Math.random() - 0.5);
    
    setFeedContent(newFeed);
  }, [selectedEmotion]);

  if (feedContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading your personalized feed...</p>
      </div>
    );
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
