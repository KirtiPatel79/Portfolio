import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import CertificationsSectionx from "@/components/certifications2"

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <CertificationsSectionx />
      <Contact />
    </div>
  )
}
