'use client';
import { Button } from "@/components/ui/button";
import {Input} from  "@/components/ui/input";
import { Form, FormControl,   FormField, FormItem, FormMessage} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../registrationSchema";
import { z } from "zod";
import { useNewsletterSignUp } from "../hook/useNewsletterSignUp";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';



export const NewsletterSignUpInNav = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();


const {
  message,
  setMessage,
  onSubmit 
} = useNewsletterSignUp();


    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            email:"",
        },
    });

    const handleFormSubmit = async (data: z.infer<typeof schema>) => {

      try {
        if (!executeRecaptcha) {
          setMessage("reCAPTCHA is not available. Please try again.");
          return;
        }
        const recaptchaToken = await executeRecaptcha("newsletter_signup_in_nav");
        if (!recaptchaToken) {
          setMessage("reCAPTCHA validation failed. Please try again.");
          return;
        }
       
        await onSubmit(data, recaptchaToken);
      } catch (error) {
        console.error("Error during form submission:", error);
        setMessage("An unexpected error occurred. Please try again.");
      }

    }


    return (
        <div className="flex sm:flex-col lg:flex-row">

                <div className="">
                        <p className="font-bold hidden lg:block text-[12px] sm:text-[16px]">Subscribe to TradeInformer</p>
                        
                        <p className=" max-w-72 hidden sm:block text-[12px] sm:text-[13px]">Get the industry&apos;s favourite newsletter in your inbox every Monday morning.</p>
                    </div>
      
       <div className="pt-2">
       <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex text-black">
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
       </div>
   
        </div>
      );
}