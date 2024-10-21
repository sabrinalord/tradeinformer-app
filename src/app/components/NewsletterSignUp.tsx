'use client';
import { Button } from "@/components/ui/button";
import {Input} from  "@/components/ui/input";
import { Form, FormControl,   FormField, FormItem, FormMessage} from "@/components/ui/form";
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../registrationSchema";
import { z } from "zod";


export const NewsletterSignUp = () => {
  const [message, setMessage] = useState<string | null>(null); // Combined message state

    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            email:"",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
      console.log("Submitted data:", data); 
      setMessage(null);

  
      
      try {
        const response = await fetch("/api/newsletterSubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log(result);
  
        if (response.ok && result.success) {
          // Set success message if the subscription was successful
          setMessage("Thank you for subscribing to TradeInformer!");
          form.reset(); // Reset form after successful submission
        } else {
          // Handle error message for email already subscribed
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


    return (
        <div className="flex">
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
                    <Input  placeholder="Your email address" {...field} />
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
            <Button className="ml-2" type="submit">Subscribe</Button>
          </form>
        </Form>
       </div>
   
        </div>
      );
}