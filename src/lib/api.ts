import axios from 'axios';
import { UserData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getUserData(discordId: string): Promise<UserData | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/user-data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  async refreshUserAvatar(discordId: string): Promise<string | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/refresh-avatar`);
      return response.data.avatarUrl;
    } catch (error) {
      console.error('Error refreshing user avatar:', error);
      return null;
    }
  }
}

export const apiService = new ApiService();