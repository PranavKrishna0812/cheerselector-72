
import React, { useState } from 'react';
import { useEmotion, type Mood } from '@/contexts/EmotionContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const moodColors: Record<Mood, string> = {
  happy: 'bg-happy',
  sad: 'bg-sad',
  anxious: 'bg-anxious',
  angry: 'bg-angry',
  neutral: 'bg-neutral',
};

const moodLightColors: Record<Mood, string> = {
  happy: 'bg-happy-light',
  sad: 'bg-sad-light',
  anxious: 'bg-anxious-light',
  angry: 'bg-angry-light',
  neutral: 'bg-neutral-light',
};

const moodDarkColors: Record<Mood, string> = {
  happy: 'bg-happy-dark',
  sad: 'bg-sad-dark',
  anxious: 'bg-anxious-dark',
  angry: 'bg-angry-dark',
  neutral: 'bg-neutral-dark',
};

const EmotionSelector: React.FC = () => {
  const { 
    selectedMood, 
    selectedEmotion, 
    setSelectedMood, 
    setSelectedEmotion, 
    getEmotionsByMood, 
    clearEmotionSelection,
    isEmotionSelected
  } = useEmotion();
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleMoodClick = (mood: Mood) => {
    setSelectedMood(mood);
    setIsExpanded(true);
  };
  
  const handleEmotionClick = (emotionId: string) => {
    const emotion = getEmotionsByMood(selectedMood!).find(e => e.id === emotionId);
    if (emotion) {
      setSelectedEmotion(emotion);
      setIsExpanded(false);
    }
  };
  
  const handleReset = () => {
    clearEmotionSelection();
    setIsExpanded(false);
  };

  const containerVariants = {
    collapsed: { height: 'auto' },
    expanded: { height: 'auto' }
  };

  if (isEmotionSelected && !isExpanded) {
    return (
      <motion.div 
        className="w-full max-w-md mx-auto p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-card p-4 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2">Current mood</p>
          <div className="flex items-center space-x-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${moodDarkColors[selectedEmotion!.mood]}`}></div>
            <span className="font-medium text-lg">{selectedEmotion!.name}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(true)}
            className="text-xs rounded-full px-4 border-gray-200 hover:bg-gray-50"
          >
            Change
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4"
      variants={containerVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="glass-card p-6">
        <h2 className="text-xl font-medium text-center mb-6">How are you feeling today?</h2>
        
        {!selectedMood ? (
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {(['happy', 'sad', 'anxious', 'angry', 'neutral'] as Mood[]).map((mood) => (
              <motion.button
                key={mood}
                className={`${moodLightColors[mood]} p-4 rounded-xl flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-md`}
                onClick={() => handleMoodClick(mood)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-10 h-10 rounded-full ${moodColors[mood]} flex items-center justify-center mb-2`}>
                  {mood === 'happy' && '😊'}
                  {mood === 'sad' && '😔'}
                  {mood === 'anxious' && '😰'}
                  {mood === 'angry' && '😡'}
                  {mood === 'neutral' && '😐'}
                </div>
                <span className="capitalize font-medium">{mood}</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <button 
                onClick={() => setSelectedMood(null)}
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <h3 className="font-medium text-lg capitalize">
                Select your {selectedMood} emotion
              </h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {getEmotionsByMood(selectedMood).map((emotion) => (
                <motion.button
                  key={emotion.id}
                  className={`p-3 rounded-xl border border-gray-100 transition-all duration-300 hover:border-gray-200 hover:bg-white/80`}
                  onClick={() => handleEmotionClick(emotion.id)}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {emotion.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}
        
        {isEmotionSelected && (
          <div className="mt-6 flex justify-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
              className="text-xs rounded-full px-4"
            >
              Reset selection
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmotionSelector;
