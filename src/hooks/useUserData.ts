import { useState, useEffect } from 'react';
import { UserData } from '../types';
import { apiService } from '../lib/api';

const DISCORD_USER_ID = import.meta.env.VITE_DISCORD_USER_ID || 'default-user-id';

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);

        // Get user data from backend
        const user = await apiService.getUserData(DISCORD_USER_ID);

        if (mounted) {
          if (user) {
            setUserData(user);
            setAvatarUrl(user.avatarUrl || '/e9c4e804b0c546262bd2bc03f593648d.jpg');
          } else {
            // Set fallback data if no user found
            setUserData({
              discordId: DISCORD_USER_ID,
              username: 'LORDX679',
              avatarUrl: '/e9c4e804b0c546262bd2bc03f593648d.jpg',
              lastUpdated: new Date(),
              bio: "I'm LORD — an 18-year-old Moroccan developer living in Italy, building digital experiences with precision, depth, and purpose.",
              skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Python'],
              projects: []
            });
            setAvatarUrl('/e9c4e804b0c546262bd2bc03f593648d.jpg');
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (mounted) {
          setError('Failed to load user data');
          // Set fallback data
          setAvatarUrl('/e9c4e804b0c546262bd2bc03f593648d.jpg');
          setUserData({
            discordId: DISCORD_USER_ID,
            username: 'LORDX679',
            avatarUrl: '/e9c4e804b0c546262bd2bc03f593648d.jpg',
            lastUpdated: new Date(),
            bio: "I'm LORD — an 18-year-old Moroccan developer living in Italy, building digital experiences with precision, depth, and purpose.",
            skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Python'],
            projects: []
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchUserData();

    return () => {
      mounted = false;
    };
  }, []);

  const refreshUserData = async () => {
    setLoading(true);
    try {
      const freshAvatarUrl = await apiService.refreshUserAvatar(DISCORD_USER_ID);
      
      if (freshAvatarUrl) {
        setAvatarUrl(freshAvatarUrl);
        
        if (userData) {
          setUserData({
            ...userData,
            avatarUrl: freshAvatarUrl,
            lastUpdated: new Date()
          });
        }
      }
    } catch (err) {
      console.error('Error refreshing user data:', err);
      setError('Failed to refresh user data');
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    avatarUrl,
    loading,
    error,
    refreshUserData
  };
}