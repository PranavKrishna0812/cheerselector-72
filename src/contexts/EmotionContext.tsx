
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type Mood = 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';

export interface Emotion {
  id: string;
  name: string;
  mood: Mood;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

interface EmotionContextType {
  selectedMood: Mood | null;
  selectedEmotion: Emotion | null;
  setSelectedMood: (mood: Mood | null) => void;
  setSelectedEmotion: (emotion: Emotion | null) => void;
  emotions: Emotion[];
  getEmotionsByMood: (mood: Mood) => Emotion[];
  clearEmotionSelection: () => void;
  isEmotionSelected: boolean;
  friends: Friend[];
  toggleFriend: (friendId: string) => void;
}

const emotions: Emotion[] = [
  // Happy emotions
  { id: 'joyful', name: 'Joyful', mood: 'happy' },
  { id: 'grateful', name: 'Grateful', mood: 'happy' },
  { id: 'excited', name: 'Excited', mood: 'happy' },
  { id: 'content', name: 'Content', mood: 'happy' },
  { id: 'proud', name: 'Proud', mood: 'happy' },
  
  // Sad emotions
  { id: 'lonely', name: 'Lonely', mood: 'sad' },
  { id: 'heartbroken', name: 'Heartbroken', mood: 'sad' },
  { id: 'disappointed', name: 'Disappointed', mood: 'sad' },
  { id: 'hopeless', name: 'Hopeless', mood: 'sad' },
  { id: 'melancholic', name: 'Melancholic', mood: 'sad' },
  
  // Anxious emotions
  { id: 'stressed', name: 'Stressed', mood: 'anxious' },
  { id: 'nervous', name: 'Nervous', mood: 'anxious' },
  { id: 'worried', name: 'Worried', mood: 'anxious' },
  { id: 'overwhelmed', name: 'Overwhelmed', mood: 'anxious' },
  { id: 'fearful', name: 'Fearful', mood: 'anxious' },
  
  // Angry emotions
  { id: 'frustrated', name: 'Frustrated', mood: 'angry' },
  { id: 'irritated', name: 'Irritated', mood: 'angry' },
  { id: 'resentful', name: 'Resentful', mood: 'angry' },
  { id: 'annoyed', name: 'Annoyed', mood: 'angry' },
  { id: 'hostile', name: 'Hostile', mood: 'angry' },
  
  // Neutral emotions
  { id: 'neutral', name: 'Neutral', mood: 'neutral' },
  { id: 'calm', name: 'Calm', mood: 'neutral' },
  { id: 'reflective', name: 'Reflective', mood: 'neutral' },
  { id: 'observant', name: 'Observant', mood: 'neutral' },
  { id: 'focused', name: 'Focused', mood: 'neutral' },
];

// Sample friends data
const sampleFriends: Friend[] = [
  { id: '1', username: 'nature_explorer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3', isFollowing: false },
  { id: '2', username: 'food_lover', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', isFollowing: false },
  { id: '3', username: 'travel_addict', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop', isFollowing: false },
  { id: '4', username: 'mindfulness_daily', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop', isFollowing: false },
];

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionSelected, setIsEmotionSelected] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>(sampleFriends);

  const getEmotionsByMood = (mood: Mood) => {
    return emotions.filter(emotion => emotion.mood === mood);
  };
  
  const clearEmotionSelection = () => {
    setSelectedMood(null);
    setSelectedEmotion(null);
    setIsEmotionSelected(false);
  };
  
  const toggleFriend = (friendId: string) => {
    setFriends(friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, isFollowing: !friend.isFollowing } 
        : friend
    ));
  };

  useEffect(() => {
    // When user changes their emotion, show a toast notification
    if (selectedEmotion) {
      setIsEmotionSelected(true);
      
      // Create appropriate message based on the emotion
      let message = '';
      if (selectedMood === 'happy') {
        message = `Great to see you're feeling ${selectedEmotion.name.toLowerCase()}! I'll highlight uplifting content.`;
      } else if (selectedMood === 'sad') {
        message = `I notice you're feeling ${selectedEmotion.name.toLowerCase()}. I'll show you some comforting content.`;
      } else if (selectedMood === 'anxious') {
        message = `I'll focus on calming content since you're feeling ${selectedEmotion.name.toLowerCase()}.`;
      } else if (selectedMood === 'angry') {
        message = `I understand you're feeling ${selectedEmotion.name.toLowerCase()}. I'll filter potentially frustrating content.`;
      } else {
        message = `I'll show you a balanced feed based on your ${selectedEmotion.name.toLowerCase()} mood.`;
      }
      
      toast(message, {
        duration: 4000,
      });
    }
  }, [selectedEmotion]);

  return (
    <EmotionContext.Provider 
      value={{ 
        selectedMood, 
        selectedEmotion, 
        setSelectedMood, 
        setSelectedEmotion,
        emotions,
        getEmotionsByMood,
        clearEmotionSelection,
        isEmotionSelected,
        friends,
        toggleFriend
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export const useEmotion = (): EmotionContextType => {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};
