
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEmotion } from '@/contexts/EmotionContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { selectedEmotion } = useEmotion();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Get accent color based on selected emotion
  const getAccentColor = () => {
    if (!selectedEmotion) return 'bg-gray-100';
    
    switch (selectedEmotion.mood) {
      case 'happy':
        return 'bg-happy/10';
      case 'sad':
        return 'bg-sad/10';
      case 'anxious':
        return 'bg-anxious/10';
      case 'angry':
        return 'bg-angry/10';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 z-50 ${getAccentColor()} backdrop-blur-md border-t border-gray-100 p-3`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-xl mx-auto flex justify-around items-center">
        <NavItem to="/" icon="home" active={isActive('/')} />
        <NavItem to="/explore" icon="explore" active={isActive('/explore')} />
        <NavItem to="/create" icon="add" active={isActive('/create')} />
        <NavItem to="/activity" icon="heart" active={isActive('/activity')} />
        <NavItem to="/profile" icon="user" active={isActive('/profile')} />
      </div>
    </motion.div>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, active }) => {
  return (
    <Link to={to} className="relative">
      <div className={`p-2 rounded-full transition-colors duration-300 ${active ? 'text-primary' : 'text-gray-500'}`}>
        {icon === 'home' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )}
        {icon === 'explore' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        {icon === 'add' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
        {icon === 'heart' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
        {icon === 'user' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
        {active && (
          <motion.div 
            className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
            layoutId="navIndicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateX(-50%)' }}
          />
        )}
      </div>
    </Link>
  );
};

export default Navbar;
