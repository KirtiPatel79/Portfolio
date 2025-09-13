"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2, Code, Database } from "lucide-react"

const experiences = [
  {
    title: "Frontend Developer",
    company: "Digiwhiz",
    period: "Feb 2024 - Mar 2025",
    location: "Ahmedabad",
    type: "Full-time",
    responsibilities: [
      "Translated Figma designs into responsive landing pages, ensuring a seamless user interface.",
      "Led the migration of the company's main internal project from SCSS/SASS and Bootstrap to Tailwind CSS, improving code maintainability and modernizing the tech stack.",
      "Built scalable and accessible UI components with Tailwind CSS, enabling faster development cycles.",
      "Implemented data fetching strategies with GraphQL within the Next.js environment, optimizing for performance and data integrity.",
    ],
    skills: ["Next.js","ReactJs", "JavaScript", "TailwindCSS", "GraphQL"],
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "SQL Developer Intern",
    company: "Psyliq",
    period: "Dec 2023 – Jan 2024",
    location: "Remote",
    type: "Internship",
    responsibilities: [
      "Exhibited strong analytical skills, problem- solving abilities, focusing on mastery of fundamental concepts.",
      "Mastered DDL for precise database design and DML for effective data interaction.",
      "Recognized the importance of SQL skills in data analytics."
    ],
    skills: ["JavaScript","JQuery","SQL"],
    icon: <Database className="h-5 w-5" />,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional Experience
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My journey in software development, building innovative solutions and growing with each project
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block z-10">
                  <div className="w-full h-full bg-primary/20 rounded-full animate-pulse"></div>
                </div>

                <div className="md:ml-20 bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                          <Badge variant="secondary" className="text-xs">
                            {exp.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Responsibilities</h4>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <Badge
                            variant="outline"
                            className="hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}