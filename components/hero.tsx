"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, Mail, MapPin } from "lucide-react";
import { trackCustomButton } from "@/lib/click_analytics";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-6 md:py-10 relative overflow-hidden">
      {/* Radial Animated Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="relative w-[70%] h-[70%] max-w-[600px] max-h-[600px]">
          {/* Central Radial Gradient */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Orbiting Circles */}
          <motion.div
            className="absolute w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg"
            style={{
              top: '20%',
              left: '20%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-20 h-20 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-lg"
            style={{
              top: '30%',
              right: '25%',
            }}
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-lg"
            style={{
              bottom: '30%',
              left: '30%',
            }}
            animate={{
              rotate: [0, -360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 4,
            }}
          />
          <motion.div
            className="absolute w-18 h-18 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"
            style={{
              bottom: '20%',
              right: '20%',
            }}
            animate={{
              rotate: [360, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />

          {/* Radial Grid Pattern */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at center, rgba(255,255,255,0.05) 2px, transparent 2px)
              `,
              backgroundSize: '30px 30px, 60px 60px',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Floating Particles in Radial Pattern */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const radius = 40 + (i % 3) * 10; // Varying distances from center
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transformOrigin: '0 0',
                }}
                animate={{
                  x: [0, Math.cos(angle) * radius],
                  y: [0, Math.sin(angle) * radius],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 6 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            );
          })}

          {/* Central Pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="flex justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-center max-w-2xl mx-auto px-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Kirti Patel
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Software Engineer
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground justify-center">
            <div className="flex items-center gap-1 justify-center">
              <Mail className="h-4 w-4" />
              <a href="mailto:kirtipatel79@outlook.com">
                kirtipatel79@outlook.com
              </a>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <MapPin className="h-4 w-4" />
              <span>Gujarat, India</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base">
            A goal-oriented software developer with experience in building web
            applications using modern technologies like React, Next.js, and
            more. Seeking to leverage my technical skills to deliver exceptional
            user experiences.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Link href="/KpResume.pdf" target="_blank" >
              <Button size="sm" className="text-xs sm:text-sm" onClick={() => trackCustomButton('Resume Click')}>
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Resume
              </Button>
            </Link>
            <Link href="https://github.com/kirtipatel79" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => trackCustomButton('Github Click')}
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="mailto:kirtipatel79@outlook.com" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => trackCustomButton('Mail Click')}
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/kirtipatel79" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => trackCustomButton('LinkedIn Click')}
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
