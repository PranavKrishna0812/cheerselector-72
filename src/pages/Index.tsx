
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import EmotionSelector from '@/components/EmotionSelector';
import ContentFeed from '@/components/ContentFeed';
import { useEmotion } from '@/contexts/EmotionContext';
import { motion } from 'framer-motion';

const Index = () => {
  const { isEmotionSelected } = useEmotion();

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <EmotionSelector />
        
        {isEmotionSelected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ContentFeed />
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Index;
