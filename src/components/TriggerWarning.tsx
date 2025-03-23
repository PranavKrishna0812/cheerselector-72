
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface TriggerWarningProps {
  type: string;
  onShow: () => void;
  onSkip: () => void;
}

const TriggerWarning: React.FC<TriggerWarningProps> = ({ type, onShow, onSkip }) => {
  return (
    <motion.div 
      className="glass-card overflow-hidden mb-6 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-center mb-2">Content Warning</h3>
      
      <p className="text-center text-gray-600 mb-6">
        This post might contain content related to <span className="font-medium">{type}</span> that could be emotionally triggering based on your current mood.
      </p>
      
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
        <Button
          variant="outline"
          className="border-gray-200"
          onClick={onSkip}
        >
          Skip content
        </Button>
        <Button onClick={onShow}>
          Show anyway
        </Button>
      </div>
    </motion.div>
  );
};

export default TriggerWarning;
