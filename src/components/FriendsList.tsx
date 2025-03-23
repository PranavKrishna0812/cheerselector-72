
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEmotion } from '@/contexts/EmotionContext';
import { UserPlus, Check } from 'lucide-react';

const FriendsList: React.FC = () => {
  const { friends, toggleFriend } = useEmotion();

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-md font-medium mb-4">Suggested Friends</h3>
      
      <div className="space-y-4">
        {friends.map(friend => (
          <div key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={friend.avatar} alt={friend.username} />
                <AvatarFallback>{friend.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{friend.username}</div>
                <div className="text-xs text-gray-500">Suggested for you</div>
              </div>
            </div>
            
            <Button 
              variant={friend.isFollowing ? "default" : "outline"} 
              size="sm"
              className={`text-xs ${friend.isFollowing ? 'bg-blue-500' : ''}`}
              onClick={() => toggleFriend(friend.id)}
            >
              {friend.isFollowing ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                  Follow
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
