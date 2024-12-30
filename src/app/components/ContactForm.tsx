'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!recaptchaValue) {
        setStatus('Please verify that you are not a robot.');
        return;
      }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptcha: recaptchaValue }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setRecaptchaValue(null);
      } else {
        // Log the response status and any additional information from the server
        const errorData = await response.json();
        console.error('Server responded with an error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        setStatus('Failed to send the message. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block font-medium mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows={5}
        />
      </div>
      <div className="mb-4">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_CONTACT_FORM || ''}
          onChange={handleRecaptchaChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Send Message
      </button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </form>
  );
}
