
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 prose prose-slate dark:prose-invert">
      <h1 className="text-cyan-500 dark:text-cyan-400">Disclaimer</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>General Disclaimer</h2>
      <p>The information provided by Mini Calculator Suite ("we," "us," or "our") on our application is for general informational purposes only. All information on the application is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the application.</p>

      <h2>Financial Tools Disclaimer</h2>
      <p>Our financial calculators, including but not limited to the Tip Calculator, Bill Splitter, Tax Calculator, and Currency Converter, are intended for estimation purposes only. They should not be relied upon as a substitute for professional financial advice, tax consultation, or official banking data. We strongly recommend consulting with a qualified professional before taking any action based on the results provided by these tools.</p>
      
      <h2>External Links Disclaimer</h2>
      <p>The application may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the application.</p>

      <h2>Technical Calculations Disclaimer</h2>
      <p>The "Core Calculators" (Transformer Core Area, Cable Core Size, CPU Core Performance) provide theoretical estimations based on standard formulas. Actual results may vary due to environmental factors, material quality, manufacturing tolerances, and other variables not accounted for in these simplified models. These tools are not a substitute for professional engineering calculations and certifications.</p>

      <h2>Limitation of Liability</h2>
      <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the application or reliance on any information provided on the application. Your use of the application and your reliance on any information on the application is solely at your own risk.</p>
    </div>
  );
};

export default Disclaimer;
