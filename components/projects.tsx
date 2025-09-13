"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    logo: "/matchwize.svg",
    title: "Prompt Enhancer",
    description:
      "Transform your simple prompts into professional, comprehensive instructions that deliver better AI results",
    image: "/promptenhancer-kpatel-site.jpg",
    tags: ["Next.js", "Python", "FastAPI", "Tailwind CSS", "Gemini API", "Notion"],
    demoUrl: "https://promptenhancer.kpatel.site/",
    githubUrl: "",
    features: [
      "Gemini API integration for Prompt Enhancement according to the user's needs and role",
      "Integrated Notion as CMS for managing blogs and content",
    ],
  },
  // {
  //   logo: "/englishexpresswayLogo.svg",
  //   title: "English Expressway",
  //   description:
  //     "An online platform to join courses and buy ebooks to learn English, featuring role-based authentication and payment integration.",
  //   image: "/englishexpressway.webp",
  //   tags: ["Next.js", "NextAuth.js", "Tailwind CSS", "MongoDB", "Razorpay"],
  //   demoUrl: "https://www.englishexpressway.com/",
  //   githubUrl: "",
  //   features: [
  //     "Role-based authentication using NextAuth.js and JWT",
  //     "Integrated Razorpay for payment transactions",
  //     "Responsive landing page with course listings",
  //     "User dashboard for enrolled courses",
  //     "Admin dashboard for content management",
  //   ],
  // },
  // {
  //   logo: "/thankquizLogo.svg",
  //   title: "ThankQuiz",
  //   description:
  //     "A fully responsive quiz web application with OTP-based authentication and AI-generated questions.",
  //   image: "/thankquiz.webp",
  //   tags: ["ReactJS", "Redux", "Bootstrap", "Figma", "OpenAI API"],
  //   demoUrl: "https://thankquiz.com/",
  //   githubUrl: "",
  //   features: [
  //     "OTP-based mobile authentication via API",
  //     "Profile completion workflows with user data storage",
  //     "Dynamic question banks from OpenAI-powered backend",
  //     "Quiz history tracking for personalized experience",
  //     "Redux for state management of authentication and quiz progress",
  //   ],
  // },

]

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-6 border rounded-xl overflow-hidden group"
            >
              <div className="overflow-hidden relative h-[300px] md:h-full border-b md:border-b-0 md:border-r">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm">
                    <Link
                      href={project.demoUrl}
                      className="flex items-center"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </Link>
                  </Button>
                  {
                    project.githubUrl && (
                      <Button size="sm" variant="outline">
                        <Link
                          href={project.githubUrl}
                          className="flex items-center"
                          target="_blank"
                        >
                          <Github className="mr-2 h-4 w-4" /> Code
                        </Link>
                      </Button>
                    )
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}