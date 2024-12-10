import { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


interface RecaptchaProps {
    onVerify: (token: string) => void; 
  }
  

const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (!executeRecaptcha) return;

    const verifyCallback = async () => {
        try {
          const token = await executeRecaptcha();
          onVerify(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
        }
    };
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null;
};

export default Recaptcha;