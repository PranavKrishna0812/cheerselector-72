
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import FriendsList from '@/components/FriendsList';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Settings, Bell, Bookmark, Heart } from 'lucide-react';

const Profile = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 pt-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 gap-8">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop" alt="current_user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-xl font-semibold">current_user</h1>
              <div className="flex gap-2">
                <Button>Edit Profile</Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start gap-6 mb-4 text-sm">
              <span><strong>24</strong> posts</span>
              <span><strong>142</strong> followers</span>
              <span><strong>168</strong> following</span>
            </div>
            
            <p className="text-sm">
              Welcome to my Emotigram profile! Sharing my journey through moments of joy and growth.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex border-b mb-4">
              <Button variant="ghost" className="flex items-center gap-2 border-b-2 border-black dark:border-white rounded-none">
                <Grid className="h-4 w-4" />
                Posts
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Liked
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + item * 10000}?q=80&w=500&auto=format&fit=crop`}
                    alt="Post thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <FriendsList />
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Profile;
