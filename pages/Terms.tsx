
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 prose prose-slate dark:prose-invert">
      <h1 className="text-cyan-500 dark:text-cyan-400">Terms & Conditions</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
      
      <p>Welcome to Mini Calculator Suite. These Terms and Conditions (“Terms”) govern your access to and use of our application and its related services (the “Service”). By accessing or using the Service, you agree to be bound by these Terms.</p>

      <h2>1. Service Usage</h2>
      <p>The Service provides a suite of calculation tools intended for personal and informational purposes only. The results generated are not a substitute for professional financial, tax, or technical advice. You agree to use the Service lawfully and are solely responsible for the accuracy of the data you input.</p>

      <h2>2. Intellectual Property</h2>
      <p>All content, features, and functionality within the Service, including its software, design, text, and graphics, are the exclusive property of Mini Calculator Suite and are protected by international copyright and other intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.</p>
      
      <h2>3. Third-Party APIs</h2>
      <p>Certain features, such as the Currency Converter, utilize third-party services like the Google Gemini API to provide data. While we integrate these services, we do not guarantee the accuracy, availability, or timeliness of the information they provide. Your use of such features is also subject to the terms of the respective third-party provider.</p>

      <h2>4. Limitation of Liability</h2>
      <p>The Service is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Mini Calculator Suite disclaims all warranties and shall not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to use the Service.</p>
      
      <h2>5. Modifications to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. We will notify users of any changes by updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
    </div>
  );
};

export default Terms;