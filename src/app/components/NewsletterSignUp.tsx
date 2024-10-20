'use client';
import { Button } from "@/components/ui/button";
import {Input} from  "@/components/ui/input";
import { Form, FormControl,   FormField, FormItem, FormMessage} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../registrationSchema";
import { z } from "zod";


export const NewsletterSignUp = () => {
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues:{
            email:"",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
      console.log("Submitted data:", data); 
  
      const response = await fetch("/api/newsletterSubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(result); 
  }


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
                  <FormMessage className="font-white" /> 
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