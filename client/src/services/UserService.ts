import axios from 'axios';
import { UserEndpoints } from '../constants/endpoints';
import User from '../types/User';

class UserService {
    static async getProfile(): Promise<User> {
        try {
            const response = await axios.get<User>(
                UserEndpoints.profile,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to get user profile');
        }
    }

    static async updateProfile(profileData: {
        wallet_address: string;
        firstname: string;
        bio: string;
        userID: string | undefined;
        email: string;
        username: string;
        lastname: string
    }): Promise<User> {
        try {
            const response = await axios.put<User>(
                UserEndpoints.profile,
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to update user profile');
        }
    }
}

export default UserService;
