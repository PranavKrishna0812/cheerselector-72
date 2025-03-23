
import { ContentItem } from '@/components/ContentCard';

// Content that could be triggering based on emotional state
export const potentiallyTriggering: { [key: string]: ContentItem[] } = {
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
