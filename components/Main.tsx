'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaMedium } from "react-icons/fa";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { appConfig } from "@/lib/config";

// Animation variants for staggered text animations
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation variants for social icons
const socialVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

// Core technologies to highlight
const coreTechnologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
  "AI Integration",
];

const Main = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 rounded-full blur-3xl"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main content with staggered animations */}
          <div className="space-y-8 text-center sm:text-left">
            {/* Greeting */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="space-y-2"
            >
              <Badge variant="outline" className="text-lg py-1.5">
                Available for Projects
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Hey, I'm Andrew Aliaj
              </h1>
            </motion.div>

            {/* Role and expertise */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl text-muted-foreground">
                Software Engineer & Full Stack Developer specializing in building
                enterprise-grade solutions with modern technologies.
              </p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {coreTechnologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="secondary">{tech}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to action buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
            >
              <Button asChild size="lg" className="group">
                <Link href="/#contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={appConfig.links.startup} target="_blank" rel="noopener noreferrer">
                  View My Startup
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="pt-8"
            >
              <TooltipProvider>
                <div className="flex gap-6 justify-center sm:justify-start">
                  {[
                    {
                      icon: FaGithub,
                      href: appConfig.links.github,
                      label: "GitHub Profile",
                      tooltip: "Check out my projects",
                    },
                    {
                      icon: FaLinkedinIn,
                      href: appConfig.links.linkedin,
                      label: "LinkedIn Profile",
                      tooltip: "Connect with me",
                    },
                    {
                      icon: FaMedium,
                      href: appConfig.links.medium,
                      label: "Medium Blog",
                      tooltip: "Read my articles",
                    },
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      custom={index}
                      variants={socialVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-background hover:bg-muted transition-colors duration-200 border border-border"
                            aria-label={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;