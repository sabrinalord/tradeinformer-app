import { useState, useCallback } from "react";
import { z } from "zod";
import { schema } from "../registrationSchema";

export const useNewsletterSignUp = () => {
  const [message, setMessage] = useState<string | null>(null);


  const onSubmit = async (data: z.infer<typeof schema>, recaptchaToken:string ) => {

    setMessage(null);

    if (!recaptchaToken) {
      setMessage("reCAPTCHA validation failed this comes from the hook. Please try again.");
      return;
    }

    try {
      // Make an API request to WordPress plugin endpoint
      const response = await fetch("/api/newsletterSubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Thank you for subscribing to TradeInformer!");
      } else {
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return {
    message,
    setMessage,
    onSubmit,
  };
};
