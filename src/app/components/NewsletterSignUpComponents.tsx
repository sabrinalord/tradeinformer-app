import Script from 'next/script';
import { useEffect } from 'react';
import { NewsletterSignUpInNav } from './NewsletterSignUpInNav';
import { NewsletterSignUpTopModal } from './NewsletterSignUpTopModal';

export const NewsletterSignUpComponents = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log('reCAPTCHA is ready');
      });
    }
  }, []);

  const executeRecaptcha = async (action: string): Promise<string | undefined> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
    if (!siteKey) {
      console.error('reCAPTCHA site key is not defined');
      throw new Error('Missing reCAPTCHA site key');
    }
  
    if (typeof window !== 'undefined' && window.grecaptcha) {
        return new Promise((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(siteKey, { action })
              .then(resolve)
              .catch((error) => {
                console.error('Error executing reCAPTCHA:', error);
                reject(error);
              });
          });
        });
      } else {
        console.error('reCAPTCHA is not loaded');
      }
  };

  return (
    <>
      {/* Loading the Google reCAPTCHA V3 library */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => console.log('reCAPTCHA script loaded')}
      />
      
      <NewsletterSignUpTopModal executeRecaptcha={executeRecaptcha} />
      <div className="hidden sm:block">
        <NewsletterSignUpInNav executeRecaptcha={executeRecaptcha} />
      </div>
    </>
  );
};
