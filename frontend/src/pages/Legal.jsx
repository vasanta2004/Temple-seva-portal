import React from 'react';

const LegalPage = ({ title, content }) => (
  <div className="min-h-screen bg-white pt-32 pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif font-bold text-primary mb-10">{title}</h1>
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
        {content.map((section, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{section.heading}</h3>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalPage 
    title="Privacy Policy"
    content={[
      { heading: '1. Information Collection', text: 'We collect personal information such as name, email, and phone number when you register for an account or book a seva.' },
      { heading: '2. Use of Information', text: 'Your information is used to manage your bookings, process donations, and send temple-related updates.' },
      { heading: '3. Data Security', text: 'We implement industry-standard security measures (SSL, encryption) to protect your data.' },
      { heading: '4. Third-Party Sharing', text: 'We do not sell or share your personal data with third parties for marketing purposes.' },
    ]}
  />
);

export const TermsConditions = () => (
  <LegalPage 
    title="Terms & Conditions"
    content={[
      { heading: '1. Acceptance of Terms', text: 'By accessing this platform, you agree to comply with the rules and regulations of Siddharoodha Temple, Hubli.' },
      { heading: '2. Donation Policy', text: 'All donations are voluntary and non-refundable. Receipts will be issued for all online transactions.' },
      { heading: '3. Seva Booking', text: 'Bookings must be made at least 24 hours in advance. Cancellation policies apply as per temple rules.' },
      { heading: '4. Code of Conduct', text: 'Devotees are expected to maintain the sanctity of the temple premises and online platforms.' },
    ]}
  />
);
