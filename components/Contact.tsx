'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedinIn, FaMedium } from 'react-icons/fa';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { appConfig } from '@/lib/config';

// Define types for our form data to match the API expectations
interface FormData {
  user_name: string;
  user_email: string;
  message: string;
}

interface FormErrors {
  user_name?: string;
  user_email?: string;
  message?: string;
}

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Contact = () => {
  // State management for form data and UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Form validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your inputs",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I&apos;ll get back to you soon.",
          duration: 5000,
        });
        setFormData({ user_name: '', user_email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message not sent",
        description: error instanceof Error ? error.message : "Please try again or contact through social media.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media links configuration
  // Inside your Contact component
const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub className="w-6 h-6" />,
    href: appConfig.links.github,
    color: 'hover:text-gray-800 dark:hover:text-gray-100',
    tooltip: 'Check out my projects'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn className="w-6 h-6" />,
    href: appConfig.links.linkedin,
    color: 'hover:text-blue-600',
    tooltip: 'Connect with me'
  },
  {
    name: 'Medium',
    icon: <FaMedium className="w-6 h-6" />,
    href: appConfig.links.medium,
    color: 'hover:text-green-600',
    tooltip: 'Read my articles'
  },
  {
    name: 'Email',
    icon: <HiMail className="w-6 h-6" />,
    href: `mailto:${appConfig.email}`,
    color: 'hover:text-red-500',
    tooltip: 'Send me an email directly'
  }
];
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white">
                Let&apos;s Connect
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Have a project in mind? I&apos;m always open to discussing new opportunities
                and innovative ideas.
              </p>
            </div>

            {/* Social Links Card */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
                <CardDescription>
                  Find me across the web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <TooltipProvider>
                    {socialLinks.map((link) => (
                      <Tooltip key={link.name}>
                        <TooltipTrigger asChild>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${link.color} transition-all duration-200 hover:scale-110`}
                            aria-label={link.name}
                          >
                            {link.icon}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{link.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HiLocationMarker className="w-5 h-5" />
                  Location
                </CardTitle>
                <CardDescription>
                  Based in the NY Tri-State area, available for remote work worldwide.
                  Open to relocation for the right opportunity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Contact Form Card */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                I&apos;ll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Input
                    id="user_name"
                    name="user_name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className={errors.user_name ? 'border-red-500' : ''}
                    aria-describedby={errors.user_name ? 'name-error' : undefined}
                  />
                  {errors.user_name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {errors.user_name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Input
                    id="user_email"
                    name="user_email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={errors.user_email ? 'border-red-500' : ''}
                    aria-describedby={errors.user_email ? 'email-error' : undefined}
                  />
                  {errors.user_email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {errors.user_email}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'border-red-500' : ''}
                    rows={6}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;