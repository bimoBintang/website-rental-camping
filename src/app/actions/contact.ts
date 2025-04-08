// app/actions/contact.ts
"use server";

import { getBaseUrl } from "@/lib/helperAbsolute";
import { z } from "zod";

// Define the ContactForm type using Zod schema
const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

export type ContactForm = z.infer<typeof contactSchema>;

export async function submitContactForm(formData: {name: string; email: string; message: string;}) {
  try {
    // Validate the data
    const validatedData = contactSchema.parse(formData);
    
    // Send the form data to your API
    const response = await fetch(`${getBaseUrl()}/api/contact` || '/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "Failed to submit form",
      };
    }
    
    const result = await response.json();
    return {
      success: true,
      message: result.message || "Form submitted successfully",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your submission.",
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};


export async function getContacts(): Promise<ContactForm[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/contact` || '/api/contact', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
        return [];
      }
  
      const result = await response.json();
  
      // Validasi array menggunakan zod
      const validated = z.array(contactSchema).safeParse(result);
  
      if (!validated.success) {
        console.error("Validation error:", validated.error);
        return [];
      }
  
      return validated.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
};

export async function deleteContact(id: string): Promise<void> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/contact/${id}` || `/api/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      console.error(`Failed to delete contact: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};