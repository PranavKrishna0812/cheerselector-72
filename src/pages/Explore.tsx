
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useEmotion } from '@/contexts/EmotionContext';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const categories = [
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'wellness', name: 'Wellness', icon: '✨' },
  { id: 'motivation', name: 'Motivation', icon: '💪' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧘' },
  { id: 'creativity', name: 'Creativity', icon: '🎨' },
  { id: 'fitness', name: 'Fitness', icon: '🏃' },
  { id: 'food', name: 'Food', icon: '🍽️' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'pets', name: 'Pets', icon: '🐾' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'music', name: 'Music', icon: '🎵' },
];

const exploreImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1450&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1471&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1471119017026-179f1bb0a70e?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540947071533-52a544260171?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1471&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1421&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530543787849-128d94430c6b?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1624221252046-a7f2499c1cfa?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1592288080420-309af53d73cb?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=1372&auto=format&fit=crop',
];

const Explore = () => {
  const { selectedEmotion } = useEmotion();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter categories based on emotion
  const getFilteredCategories = () => {
    if (!selectedEmotion) return categories;
    
    const prioritizedCategories = [...categories];
    
    if (selectedEmotion.mood === 'sad') {
      // Prioritize uplifting categories
      const upliftingIds = ['motivation', 'wellness', 'mindfulness', 'pets'];
      prioritizedCategories.sort((a, b) => {
        if (upliftingIds.includes(a.id) && !upliftingIds.includes(b.id)) return -1;
        if (!upliftingIds.includes(a.id) && upliftingIds.includes(b.id)) return 1;
        return 0;
      });
    } else if (selectedEmotion.mood === 'anxious') {
      // Prioritize calming categories
      const calmingIds = ['mindfulness', 'nature', 'wellness'];
      prioritizedCategories.sort((a, b) => {
        if (calmingIds.includes(a.id) && !calmingIds.includes(b.id)) return -1;
        if (!calmingIds.includes(a.id) && calmingIds.includes(b.id)) return 1;
        return 0;
      });
    } else if (selectedEmotion.mood === 'angry') {
      // Prioritize distracting categories
      const distractingIds = ['pets', 'nature', 'music', 'books'];
      prioritizedCategories.sort((a, b) => {
        if (distractingIds.includes(a.id) && !distractingIds.includes(b.id)) return -1;
        if (!distractingIds.includes(a.id) && distractingIds.includes(b.id)) return 1;
        return 0;
      });
    } else if (selectedEmotion.mood === 'happy') {
      // Prioritize fun categories
      const funIds = ['trending', 'travel', 'creativity', 'music'];
      prioritizedCategories.sort((a, b) => {
        if (funIds.includes(a.id) && !funIds.includes(b.id)) return -1;
        if (!funIds.includes(a.id) && funIds.includes(b.id)) return 1;
        return 0;
      });
    }
    
    return prioritizedCategories;
  };

  return (
    <MainLayout>
      <motion.div
        className="px-4 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Explore Categories</h3>
          <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
            {getFilteredCategories().map((category, index) => (
              <motion.div
                key={category.id}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <button className="flex flex-col items-center space-y-1">
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Personalized For You</h3>
          <div className="grid grid-cols-2 gap-2">
            {exploreImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <img 
                  src={image} 
                  alt={`Explore ${index}`} 
                  className="object-cover w-full h-full" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Explore;
