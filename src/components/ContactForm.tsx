"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000)
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactFormProps {
  contact?: (formData: ContactForm) => Promise<{ success: boolean; message: string }>;
}

const ContactForm = ({ contact }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing again
    if (errors[name as keyof ContactForm]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({});

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      setErrors({});

      if (contact) {
        // Call the server action provided via props
        const result = await contact(validatedData);
        
        setStatus({
          success: result.success,
          message: result.message
        });

        if (result.success) {
          // Reset form on successful submission
          setFormData({ name: "", email: "", message: "" });
        }
      } else {
        // Fallback if no server action is provided
        setStatus({
          success: true,
          message: "Form submitted successfully (no server action configured)"
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into a friendly format
        const newErrors: Partial<Record<keyof ContactForm, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(newErrors);
        setStatus({ success: false, message: "Please fix the validation errors" });
      } else {
        setStatus({ success: false, message: "An unexpected error occurred" });
        console.error("Form submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.name ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.message ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
            aria-invalid={errors.message ? "true" : "false"}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-lg font-medium transition ${
            isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
      {status.message && (
        <div className={`mt-4 p-3 rounded-lg ${status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {status.message}
        </div>
      )}
    </motion.div>
  );
};

export default ContactForm;