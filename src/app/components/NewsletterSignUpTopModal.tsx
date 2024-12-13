'use client';

import { Button } from "@/components/ui/button";
import {Input} from  "@/components/ui/input";
import { Form, FormControl,   FormField, FormItem, FormMessage} from "@/components/ui/form";
import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../registrationSchema";
import { z } from "zod";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNewsletterSignUp } from "../hook/useNewsletterSignUp";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';



export const NewsletterSignUpTopModal = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();

 
  const { 
    message, 
    setMessage,
    onSubmit } = useNewsletterSignUp();
  
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const scrollThreshold = 300;


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setShowSignUp(true);
      } else {
        setShowSignUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const handleSignUpModal= () => {  
    setShowSignUp(!showSignUp)
    return setShowSignUp
  }
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            email:"",
        },
    });

    const handleFormSubmit = async (data: z.infer<typeof schema>) => {
      console.log('executing generate token from newsletter top modal ');

      try {
        if (!executeRecaptcha) {
          setMessage("reCAPTCHA is not available. Please try again.");
          return;
        }
        console.log('executing generate token from newsletter sign up in nav');
        const recaptchaToken = await executeRecaptcha("newsletter_signup_top_modal");
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
        
        <div className={` ${showSignUp ? "fixed" : "hidden"} top-0 z-10 left-0 w-screen bg-babyBlue p-2 text-white items-center animate-slideDown`}>
              <div className="absolute top-0 right-0 m-2">
                <button onClick={handleSignUpModal} className=" text-white font-extrabold hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            <div className="text-center">
                  <p className="font-bold text-[13px] sm:text-[16px] mr-2 text-center ">Subscribe to TradeInformer</p>
                  <p className="text-center text-[13px] sm:text-[14px] mr-1 sm:mr-4">Get the industry&apos;s favourite newsletter in your inbox every Monday morning.</p>
              </div>

       
          <div className="flex justify-center">
            <div className="pt-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex text-black">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className=" sm:max-w-52 w-26 h-8" placeholder="email address" {...field} />
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
                        <Button className="ml-2 text-black bg-warmYellow hover:bg-[#e0c200] w-20 h-8 sm:w-28 " type="submit">Subscribe</Button>

                    </form>
                  </Form>
          

            </div>
          </div>
            
        
        </div>
      );
}