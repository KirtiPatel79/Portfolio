"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award } from "lucide-react"

const education = [
  {
    institution: "Parul University",
    degree: "Bachelor of Technology in Information Technology",
    period: "Oct 2020 - May 2024",
    gpa: "CGPA: 7.93/10",
    location: "Vadodara, Gujarat",
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20">
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
            Education & Learning
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My academic foundation and continuous learning journey in technology
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Header Section */}
              <div className="flex flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {edu.institution}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">{edu.degree}</p>

                  {/* Details Grid - Responsive */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex items-center justify-start gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{edu.period}</span>
                    </div>

                    <div className="flex items-center justify-start gap-2 text-sm text-muted-foreground xs:col-span-2 lg:col-span-1">
                      <Award className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium truncate">{edu.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>


            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}