
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type Mood = 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';

export interface Emotion {
  id: string;
  name: string;
  mood: Mood;
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

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionSelected, setIsEmotionSelected] = useState<boolean>(false);

  const getEmotionsByMood = (mood: Mood) => {
    return emotions.filter(emotion => emotion.mood === mood);
  };
  
  const clearEmotionSelection = () => {
    setSelectedMood(null);
    setSelectedEmotion(null);
    setIsEmotionSelected(false);
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
        isEmotionSelected
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
