import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import javascriptImg from '/public/assets/skills/javascript.png';
import pythonImg from '/public/assets/skills/python.png';
import typescriptImg from '/public/assets/skills/typescript.png';
import reactImg from '/public/assets/skills/react.png';
import reduxImg from '/public/assets/skills/redux.png';
import tailwindImg from '/public/assets/skills/tailwind.png';
import nextjsImg from '/public/assets/skills/nextjs.png';
import nodeImg from '/public/assets/skills/node.png';
import expressImg from '/public/assets/skills/express.png';
import djangoImg from '/public/assets/skills/django.png';
import sqlImg from '/public/assets/skills/sql.png';
import mongoImg from '/public/assets/skills/mongo.png';
import awsImg from '/public/assets/skills/aws.png';
import jestImg from '/public/assets/skills/jest.png';
import graphQLImg from '/public/assets/skills/graphQL.png';
import dockerImg from '/public/assets/skills/docker.png';
import gitImg from '/public/assets/skills/git.png';
import gitHubImg from '/public/assets/skills/github.png';
import flaskImg from '/public/assets/skills/flask.png';
import reactqueryImg from '/public/assets/skills/reactquery.png';
import reacttestingImg from '/public/assets/skills/reacttesting.png'; 
import kubernetesImg from '/public/assets/skills/kubernetes.png';
import goImg from '/public/assets/skills/go.png';
import vercelImg from '/public/assets/skills/vercel.png';
import reactnativeImg from '/public/assets/skills/reactnative.png';
import figmaImg from '/public/assets/skills/figma.png';


const skills = [
 
  { img: javascriptImg, label: 'JavaScript' },
  { img: reactImg, label: 'React' },
  { img: nextjsImg, label: 'Next.js' }, 
  { img: typescriptImg, label: 'TypeScript' },
  { img: pythonImg, label: 'Python' },
  { img: reduxImg, label: 'Redux' },
  { img: tailwindImg, label: 'Tailwind CSS' },
  { img: nodeImg, label: 'Node.js' },
  { img: expressImg, label: 'Express.js' },
  { img: djangoImg, label: 'Django' },
  { img: sqlImg, label: 'SQL' },
  { img: mongoImg, label: 'MongoDB' },
  { img: awsImg, label: 'AWS' },
  { img: jestImg, label: 'Jest' },
  { img: graphQLImg, label: 'GraphQL' },
  { img: dockerImg, label: 'Docker' },
  { img: gitImg, label: 'Git' },
  { img: gitHubImg, label: 'GitHub' },
  { img: flaskImg, label: 'Flask' },
  { img: reactqueryImg, label: 'React Query' },
  { img: reacttestingImg, label: 'React Testing Library' },
  { img: kubernetesImg, label: 'Kubernetes' },
  { img: goImg, label: 'Go' },
  { img: vercelImg, label: 'Vercel' },
  { img: reactnativeImg, label: 'React Native' },
  { img: figmaImg, label: 'Figma' },
];

interface SkillCategory {
  title: string;
  description: string;
  skills: Array<{
    name: string;
    icon: any; // Update with proper type from your imports
    proficiency: number;
  }>;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "React", icon: skillsData.reactImg, proficiency: 95 },
      { name: "Next.js", icon: skillsData.nextjsImg, proficiency: 90 },
      { name: "TypeScript", icon: skillsData.typescriptImg, proficiency: 85 },
      { name: "Tailwind CSS", icon: skillsData.tailwindImg, proficiency: 90 }
    ]
  },
  {
    title: "Backend Development",
    description: "Creating robust and scalable server-side applications",
    skills: [
      { name: "Node.js", icon: skillsData.nodeImg, proficiency: 85 },
      { name: "Python", icon: skillsData.pythonImg, proficiency: 80 },
      { name: "Django", icon: skillsData.djangoImg, proficiency: 75 },
      { name: "Express", icon: skillsData.expressImg, proficiency: 85 }
    ]
  },
  {
    title: "Cloud & DevOps",
    description: "Deploying and maintaining cloud infrastructure",
    skills: [
      { name: "AWS", icon: skillsData.awsImg, proficiency: 80 },
      { name: "Docker", icon: skillsData.dockerImg, proficiency: 75 },
      { name: "Kubernetes", icon: skillsData.kubernetesImg, proficiency: 70 },
      { name: "Git", icon: skillsData.gitImg, proficiency: 90 }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive skill set in modern web development and cloud technologies
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="cloud">Cloud & DevOps</TabsTrigger>
          </TabsList>

          {skillCategories.map((category, index) => (
            <TabsContent 
              key={index} 
              value={category.title.toLowerCase().split(' ')[0]}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">{skill.name}</h3>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;