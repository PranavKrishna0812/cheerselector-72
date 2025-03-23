
import { ContentItem } from '@/components/ContentCard';

// Mood-enhancing content
export const emotionSpecificContent: { [key: string]: ContentItem[] } = {
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
