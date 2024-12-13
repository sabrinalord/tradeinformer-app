// import { useEffect } from 'react';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


// interface RecaptchaProps {
//     onVerify: (token: string) => void; 
//   }
  

// const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify }) => {
//   console.log('executing recaptcha')
//   const { executeRecaptcha } = useGoogleReCaptcha();

//   try {
//     // Trigger reCAPTCHA and get the token
//     const token = await executeRecaptcha("submit"); // Pass the action name (e.g., "submit")

//     if (!token) {
//       setMessage("reCAPTCHA validation failed. Please try again.");
//       return;
//     }

//   useEffect(() => {
//     if (!executeRecaptcha) return;

//     const verifyCallback = async () => {
//         try {
//           const token = await executeRecaptcha();
//           console.log(token)
//           onVerify(token);
//         } catch (error) {
//           console.error('reCAPTCHA execution failed:', error);
//         }
//     };
//     verifyCallback();
//   }, [executeRecaptcha, onVerify]);

//   return null;
// };

// export default Recaptcha;