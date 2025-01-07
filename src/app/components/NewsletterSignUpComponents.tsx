import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { NewsletterSignUpInNav } from './NewsletterSignUpInNav';
import { NewsletterSignUpTopModal } from './NewsletterSignUpTopModal';


export const NewsletterSignUpComponents = () => { 

    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}>
            <NewsletterSignUpTopModal></NewsletterSignUpTopModal>
            <div className="hidden sm:block"><NewsletterSignUpInNav></NewsletterSignUpInNav></div>
         </GoogleReCaptchaProvider>

    )
}
