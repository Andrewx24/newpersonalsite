// components/About.tsx
import Image from "next/image";
import profileImg from '@/public/assets/profile/profile.png';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "./AnimatedSection";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-12">
          {/* Header Section */}
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white">
              Building Modern Enterprise Solutions
            </h2>
            <p className="text-muted-foreground text-lg">
              Transforming business requirements into scalable, efficient software solutions
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Profile Image */}
            <AnimatedSection className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <Image
                  src={profileImg}
                  alt="Andrew Aliaj - Software Engineer"
                  className="rounded-xl shadow-2xl"
                  placeholder="blur"
                  priority
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </AnimatedSection>

            {/* Content Cards */}
            <AnimatedSection className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Excellence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Full Stack Development</Badge>
                    <Badge variant="secondary">Cloud Architecture</Badge>
                    <Badge variant="secondary">AI Integration</Badge>
                    <Badge variant="secondary">Enterprise Solutions</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Specializing in building scalable applications using modern technologies
                    and best practices, with a focus on performance and maintainability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Custom software development tailored to your business needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Cloud infrastructure design and implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Technical consultation and architecture planning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;