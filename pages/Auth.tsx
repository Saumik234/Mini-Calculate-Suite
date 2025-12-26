import React, { useState } from 'react';
import { Page, User } from '../types';
import { GoogleIcon } from '../components/icons';
import { authService } from '../services/authService';

interface AuthProps {
    setPage: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ setPage }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            const randomId = Math.random().toString(36).substring(2, 9);
            const newUser: User = {
                uid: `google|${Date.now()}`,
                email: `user.${randomId}@example.com`,
                displayName: `User ${randomId.charAt(0).toUpperCase() + randomId.slice(1)}`,
                photoURL: `https://i.pravatar.cc/150?u=${randomId}`
            };
            await authService.signInWithGoogle(newUser);
            // App.tsx's onAuthStateChanged will handle navigation
        } catch (err: any) {
            setError(err.message || 'Failed to sign in.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden p-8 space-y-8">
                <div>
                    <div className="flex justify-center mb-4">
                        <GoogleIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                        Sign in to continue
                    </h2>
                     <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                        Welcome to Mini Calculator Suite
                    </p>
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm bg-cyan-600 text-lg font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>
                            <GoogleIcon />
                            <span className="ml-3">Sign in with Google</span>
                        </>
                    )}
                </button>

                <div className="text-xs text-slate-400 dark:text-slate-500 text-center">
                   By continuing, you agree to our <button onClick={() => setPage(Page.Terms)} className="underline hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</button> and <button onClick={() => setPage(Page.Privacy)} className="underline hover:text-slate-800 dark:hover:text-slate-300">Privacy Policy</button>.
                </div>
            </div>
        </div>
    );
};

export default Auth;