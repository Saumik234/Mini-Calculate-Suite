import { User } from '../types';

// This is a mock authentication service.
// In a real application, this would be replaced with Firebase, Auth0, etc.

const FAKE_USER_KEY = 'mini_calculator_user';

let onAuthCallback: ((user: User | null) => void) | null = null;

const notifyAuthChange = (user: User | null) => {
  if (onAuthCallback) {
    onAuthCallback(user);
  }
};

const getStoredUser = (): User | null => {
    try {
        const storedUser = localStorage.getItem(FAKE_USER_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        return null;
    }
}

export const authService = {
  signInWithGoogle: async (user: User): Promise<User> => {
    // Simulate a successful Google sign-in with the selected user
    localStorage.setItem(FAKE_USER_KEY, JSON.stringify(user));
    notifyAuthChange(user);
    return user;
  },

  signOut: async (): Promise<void> => {
    localStorage.removeItem(FAKE_USER_KEY);
    notifyAuthChange(null);
  },

  // Mimics onAuthStateChanged from Firebase
  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    onAuthCallback = callback;
    // Immediately call with the stored user on subscription
    callback(getStoredUser());
    
    // Return an unsubscribe function
    return () => {
      onAuthCallback = null;
    };
  },
};