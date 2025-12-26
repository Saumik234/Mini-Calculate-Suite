import React, { useState } from 'react';
import CalculatorWrapper from '../../components/CalculatorWrapper';

const ApiKeyGenerator: React.FC = () => {
    const [generatedKey, setGeneratedKey] = useState<string>('');

    const handleGenerate = () => {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 39; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        setGeneratedKey('AIza' + result.substring(0, 35)); // Typical format
    };

    return (
        <CalculatorWrapper title="Google API Key Tool">
            <div className="space-y-6 text-sm text-slate-500 dark:text-slate-400">
                <p>
                    Some features in this app, like the <strong>Currency Converter</strong>, use the Google Gemini API to fetch real-time data. To use these features, you need to provide your own Google API key.
                </p>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">How to get your API Key:</h3>
                    <ol className="list-decimal list-inside space-y-1 pl-2">
                        <li>Visit <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer" className="text-cyan-500 dark:text-cyan-400 hover:underline">Google AI Studio</a>.</li>
                        <li>Click on "Get API key" and sign in with your Google account.</li>
                        <li>Create a new API key in a new or existing project.</li>
                        <li>Copy the generated key.</li>
                        <li>Set it as an environment variable named <code>API_KEY</code> for this application.</li>
                    </ol>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg space-y-4">
                    <p className="font-semibold text-center">Don't have a key? Generate an example to see what it looks like.</p>
                    <button
                        onClick={handleGenerate}
                        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
                        >
                        Generate Example Key
                    </button>
                    {generatedKey && (
                        <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-md text-center break-words">
                            <p className="font-mono text-xs text-slate-700 dark:text-slate-300">{generatedKey}</p>
                            <p className="text-xs text-red-500 mt-2 font-semibold">
                                This is a randomly generated placeholder. It is NOT a real API key.
                            </p>
                        </div>
                    )}
                </div>

                <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                    Your API key is sensitive. Do not share it publicly. This application accesses it from a secure environment variable.
                </p>

            </div>
        </CalculatorWrapper>
    );
};

export default ApiKeyGenerator;
