import type { Metadata } from "next";
import { seoConfig } from "@/lib/seo-config";
import { appConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = seoConfig.getMetadata('/');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Software Solutions for Modern Enterprises
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Specialized in building scalable applications with modern technologies.
                From concept to deployment, delivering robust solutions that drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/#about"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg filter blur-3xl opacity-30" />
              <div className="relative">
                {/* Add your hero image here */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-primary/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Technologies Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Technologies I Work With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Add your technology logos/icons here */}
            {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
              <div 
                key={tech}
                className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-center space-x-6">
            <Link
              href={appConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link
              href={appConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}