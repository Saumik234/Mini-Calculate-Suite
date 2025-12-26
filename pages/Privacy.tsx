
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 prose prose-slate dark:prose-invert">
      <h1 className="text-cyan-500 dark:text-cyan-400">Privacy Policy</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>

      <p>Mini Calculator Suite is committed to protecting your privacy. This Privacy Policy outlines our practices concerning the collection, use, and security of your information through our Service.</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Calculation & History Data:</strong> Data you enter for calculations (e.g., bill amounts, expenses) and the resulting history are stored locally on your device using your browser's storage. This data is sandboxed within your browser and is not transmitted to our servers.</li>
        <li><strong>Authentication Identifiers:</strong> When you sign in, an anonymous identifier is stored locally to maintain your session. We do not collect or store personal details like your real name or email address from your Google account.</li>
        <li><strong>Anonymous Usage Analytics:</strong> We may collect non-personal, aggregated data about feature usage (e.g., which calculators are most popular) to improve the application. This data is anonymized and cannot be linked to you.</li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>Your data is used solely to provide and enhance the Service's functionality, such as retaining your calculation history for your convenience and understanding usage trends to guide future development. We do not sell or share your data with third parties for marketing purposes.</p>

      <h2>3. Data Security & Control</h2>
      <p>We rely on browser-standard security measures for local data storage. You have full control over your data and can clear your calculation history at any time through the app's settings or by clearing your browser's site data.</p>
      
      <h2>4. Third-Party Services</h2>
      <p>The Currency Converter feature uses the Google Gemini API. Your queries to this service are subject to Google's Privacy Policy. No personal information from your account is sent with these API requests.</p>
    </div>
  );
};

export default Privacy;