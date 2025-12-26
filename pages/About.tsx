
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 prose prose-slate dark:prose-invert">
      <h1 className="text-cyan-500 dark:text-cyan-400">About Mini Calculator Suite</h1>
      
      <h2>Our Mission</h2>
      <p>Our mission is to provide a comprehensive, user-friendly, and reliable suite of calculation tools designed for everyday life, financial planning, and specialized technical work. We believe in empowering our users with powerful tools that are both accessible and intuitive, simplifying complex calculations into a seamless experience.</p>

      <h2>What We Offer</h2>
      <p>Mini Calculator Suite is more than just a single tool; it's an all-in-one hub for your calculation needs. Our application includes:</p>
      <ul>
        <li><strong>Financial Tools:</strong> Effortlessly calculate tips, split bills among friends, convert currencies with AI-powered real-time rates, and determine taxes.</li>
        <li><strong>Personal Management:</strong> Keep track of your spending with a simple and effective Expense Tracker.</li>
        <li><strong>Specialized Core Calculators:</strong> A unique set of tools for engineers, hobbyists, and professionals to calculate transformer core area, cable core size, and relative CPU performance.</li>
      </ul>

      <h2>Our Technology</h2>
      <p>We leverage modern web technologies to deliver a fast, responsive, and reliable experience that works offline. For features requiring up-to-date information, such as our Currency Converter, we integrate with cutting-edge services like the Google Gemini API to provide accurate and timely data.</p>
      
      <h2>Commitment to Privacy</h2>
      <p>Your privacy is a top priority. Calculation data and history are stored locally on your device, giving you full control. We are committed to transparency and do not collect personal information for marketing or third-party sharing. For more details, please review our Privacy Policy.</p>
      
      <h2>Join Us on Our Journey</h2>
      <p>Thank you for choosing Mini Calculator Suite. We are a passionate team of developers and designers dedicated to continuous improvement. We are always working on new features and enhancements, and we welcome your feedback to help us make the app even better.</p>
    </div>
  );
};

export default About;