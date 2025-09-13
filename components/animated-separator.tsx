"use client"

import { motion } from "framer-motion"

const skills = [
  "Performant", "Scalable", "Maintainable", "Robust", "Secure", "Reliable",
  "Innovative", "Creative", "Leader", "Motivator", "Mentor", "Coach",
  "Responsive", "Modern", "Efficient", "Professional", "Adaptive", "Strategic"
]

export default function AnimatedSeparator() {
  return (
    <div className="py-16 lg:py-24 overflow-hidden relative">
      {/* Force full width by breaking out of parent */}
      <div className="absolute left-1/2 right-1/2 -ml-[50vw] w-screen">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-500 -rotate-3 -mx-1">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <motion.div
              className="flex flex-none gap-4 py-3 pr-4"
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-4">
                  {skills.map((skill, index) => (
                    <div key={`${setIndex}-${index}`} className="inline-flex gap-4 items-center">
                      <span className="text-gray-900 uppercase font-extrabold text-sm whitespace-nowrap">
                        {skill}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="size-6 text-gray-900 -rotate-12 flex-shrink-0"
                      >
                        <path
                          fill="currentColor"
                          d="M12 1s0 7-2 9-9 2-9 2 7 0 9 2 2 9 2 9 0-7 2-9 9-2 9-2-7 0-9-2-2-9-2-9"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
