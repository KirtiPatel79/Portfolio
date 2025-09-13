"use client"

import { motion } from "framer-motion"
import { FaBootstrap, FaCss3, FaGitAlt, FaGithub, FaHtml5, FaJs, FaReact } from "react-icons/fa";
import { SiGraphql, SiJquery, SiSass,SiPostgresql,SiUmbraco,SiSourcetree,SiBitbucket,SiJira  } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { DiVisualstudio } from "react-icons/di";
import { IoLogoFigma } from "react-icons/io5";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS", icon: <FaCss3 className="text-blue-500" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "SQL", icon: <SiPostgresql  className="text-blue-600"/> },
      { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
    ],
  },
  {
    title: "Frameworks/Libraries",
    skills: [
      { name: "ReactJS", icon: <FaReact className="text-blue-500" /> },
      { name: "NextJS", icon: <RiNextjsFill className="text-black dark:text-white" /> },
      { name: "jQuery", icon: <SiJquery className="text-blue-600" /> },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-cyan-400" /> },
      { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
      { name: "SCSS/SASS", icon: <SiSass className="text-pink-500" /> },
      { name: "Umbraco CMS", icon: <SiUmbraco  className="text-blue-600" /> },
    ],
  },
  {
    title: "Development Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub className="text-black dark:text-white" /> },
      { name: "Sourcetree", icon: <SiSourcetree  className="text-blue-600 "/> },
      { name: "Bitbucket", icon: <SiBitbucket className="text-blue-600"/> },
      { name: "Visual Studio", icon: <DiVisualstudio className="text-purple-500" /> },
      { name: "JIRA", icon: <SiJira className="text-blue-600"/> },
      { name: "Figma", icon: <IoLogoFigma className="text-purple-600" /> },
    ],
  },
]

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-10 text-center "
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Technologies and tools I've worked with throughout my projects and experience
        </motion.p>

        <motion.div
          className="grid gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
            >
              <motion.h3
                className="text-xl font-semibold mb-4"
                whileHover={{
                  x: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {category.title}
              </motion.h3>
               <div className="flex flex-wrap gap-3">
                 {category.skills.map((skill, idx) => (
                   <motion.div
                     key={idx}
                     className="group"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.3, delay: 0.1 * idx }}
                   >
                     <motion.div
                       className={`
                         px-4 py-2 rounded-md bg-muted/50 border border-border/50
                         flex items-center gap-2 text-sm font-medium min-h-[40px]
                         group-hover:bg-muted group-hover:border-border
                         transition-all duration-300 cursor-default
                       `}
                       whileHover={{
                         scale: 1.02,
                         transition: { type: "spring", stiffness: 300 }
                       }}
                     >
                       <span className={`flex-shrink-0 ${!skill.name ? 'text-lg ' : ''}`}>
                         {skill.icon}
                       </span>
                       {skill.name && (
                         <span className="text-foreground">
                           {skill.name}
                         </span>
                       )}
                     </motion.div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}