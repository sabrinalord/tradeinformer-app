'use client';
import { Button } from "@/components/ui/button";
import {Input} from  "@/components/ui/input";
import { Form, FormControl,   FormField, FormItem, FormMessage} from "@/components/ui/form";
import { SetStateAction, useCallback, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../registrationSchema";
import { z } from "zod";
import  Recaptcha from "../components/Recaptcha";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';



export const NewsletterSignUpInNav = () => {
  const [message, setMessage] = useState<string | null>(null);
const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);


    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            email:"",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
      console.log("Submitted data:", data); 
      setMessage(null);

      if (!recaptchaToken) {
        setMessage("Please complete the reCAPTCHA verification.");
        return;
      }
  
      
      try {
        const response = await fetch("/api/newsletterSubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
         {   ...data,
          recaptchaToken})
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          setMessage("Thank you for subscribing to TradeInformer!");
          form.reset(); 
          setRecaptchaToken(null);
        } else {
          if (result.message === "This email is already subscribed.") {
            setMessage("This email is already subscribed.");
          } else {
            setMessage(result.message || 'Something went wrong. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

// have used useCallback to memoize the function reference - this is so handleRecaptchaVerify function
// maintains a stable reference across renders. This is because it is passed as a dependency
// to the Recaptcha component's useEffect. Without memoization, it causes an infinite loop in useEffect.

    const handleRecaptchaVerify = useCallback((token: SetStateAction<string | null>) => {
      setRecaptchaToken(token);
  }, []);


    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}>

        <div className="flex sm:flex-col lg:flex-row">
                <div className="">
                        <p className="font-bold hidden lg:block text-[12px] sm:text-[16px]">Subscribe to TradeInformer</p>
                        
                        <p className=" max-w-72 hidden sm:block text-[12px] sm:text-[13px]">Get the industry&apos;s favourite newsletter in your inbox every Monday morning.</p>
                    </div>
      
       <div className="pt-2">
       <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex text-black">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-8"  placeholder="Your email address" {...field} />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage className="font-white">
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                  {message && (
          <FormMessage className={message.includes("Thank you") ? "text-white" : "text-destructive"}>
            {message}
          </FormMessage>)}
                </FormItem>
              )}
            />
            <Button className="ml-2 h-8" type="submit">Subscribe</Button>
          </form>
        </Form>
        <Recaptcha onVerify={handleRecaptchaVerify} /> 
       </div>
   
        </div>
        </GoogleReCaptchaProvider>
      );
}