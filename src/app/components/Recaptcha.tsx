import { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


interface RecaptchaProps {
    onVerify: (token: string) => void; 
  }
  

const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        onVerify(token); // Send token to backend or handle verification here
      }
    };
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null;
};

export default Recaptcha;