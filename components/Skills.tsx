import Image from "next/image";
import { Card } from "@/components/ui/card";
import { StaticImageData } from "next/image";

// Import skill images with more descriptive naming
import javascriptImg from '@/public/assets/skills/javascript.png';
import pythonImg from '@/public/assets/skills/python.png';
import typescriptImg from '@/public/assets/skills/typescript.png';
import reactImg from '@/public/assets/skills/react.png';
import reduxImg from '@/public/assets/skills/redux.png';
import tailwindImg from '@/public/assets/skills/tailwind.png';
import nextjsImg from '@/public/assets/skills/nextjs.png';
import nodeImg from '@/public/assets/skills/node.png';
import expressImg from '@/public/assets/skills/express.png';
import djangoImg from '@/public/assets/skills/django.png';
import sqlImg from '@/public/assets/skills/sql.png';
import mongoImg from '@/public/assets/skills/mongo.png';
import awsImg from '@/public/assets/skills/aws.png';
import jestImg from '@/public/assets/skills/jest.png';
import graphQLImg from '@/public/assets/skills/graphQL.png';
import dockerImg from '@/public/assets/skills/docker.png';
import gitImg from '@/public/assets/skills/git.png';
import gitHubImg from '@/public/assets/skills/github.png';
import flaskImg from '@/public/assets/skills/flask.png';
import reactqueryImg from '@/public/assets/skills/reactquery.png';
import reacttestingImg from '@/public/assets/skills/reacttesting.png';
import kubernetesImg from '@/public/assets/skills/kubernetes.png';
import goImg from '@/public/assets/skills/go.png';
import vercelImg from '@/public/assets/skills/vercel.png';
import reactnativeImg from '@/public/assets/skills/reactnative.png';
import figmaImg from '@/public/assets/skills/figma.png';

// Define types for our skill data structure
interface Skill {
  name: string;
  icon: StaticImageData;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
}

// Organize skills into a single array with categories
const skills: Skill[] = [
  // Frontend Skills
  { name: "React", icon: reactImg, category: "Frontend" },
  { name: "Next.js", icon: nextjsImg, category: "Frontend" },
  { name: "TypeScript", icon: typescriptImg, category: "Frontend" },
  { name: "JavaScript", icon: javascriptImg, category: "Frontend" },
  { name: "Redux", icon: reduxImg, category: "Frontend" },
  { name: "Tailwind CSS", icon: tailwindImg, category: "Frontend" },
  { name: "React Native", icon: reactnativeImg, category: "Frontend" },
  { name: "React Query", icon: reactqueryImg, category: "Frontend" },
  { name: "React Testing", icon: reacttestingImg, category: "Frontend" },

  // Backend Skills
  { name: "Node.js", icon: nodeImg, category: "Backend" },
  { name: "Express.js", icon: expressImg, category: "Backend" },
  { name: "Python", icon: pythonImg, category: "Backend" },
  { name: "Django", icon: djangoImg, category: "Backend" },
  { name: "Flask", icon: flaskImg, category: "Backend" },
  { name: "SQL", icon: sqlImg, category: "Backend" },
  { name: "MongoDB", icon: mongoImg, category: "Backend" },
  { name: "GraphQL", icon: graphQLImg, category: "Backend" },
  { name: "Go", icon: goImg, category: "Backend" },

  // DevOps Skills
  { name: "AWS", icon: awsImg, category: "DevOps" },
  { name: "Docker", icon: dockerImg, category: "DevOps" },
  { name: "Kubernetes", icon: kubernetesImg, category: "DevOps" },
  { name: "Vercel", icon: vercelImg, category: "DevOps" },

  // Development Tools
  { name: "Git", icon: gitImg, category: "Tools" },
  { name: "GitHub", icon: gitHubImg, category: "Tools" },
  { name: "Jest", icon: jestImg, category: "Tools" },
  { name: "Figma", icon: figmaImg, category: "Tools" },
];

// Group skills by category for organized rendering
const groupedSkills = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive skill set in modern web development and cloud technologies
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                {category} Development
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categorySkills.map((skill) => (
                  <Card 
                    key={skill.name}
                    className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-3"
                  >
                    <div className="relative w-12 h-12">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 48px) 100vw, 48px"
                        priority={category === "Frontend"}
                      />
                    </div>
                    <h4 className="text-sm font-medium text-center">
                      {skill.name}
                    </h4>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;