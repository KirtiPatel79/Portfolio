"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { trackCustomButton } from '@/lib/click_analytics';

type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  verifyUrl: string;
  certificateUrl?: string; // optional
  skills?: string[]; // optional, since not all certifications have it
  color: string;
};

// Mock data - replace with your actual data
const certifications: Certification[]  = [
  {
    id: 1,
    title: "Oracle Cloud Infrastructure Generative AI Professional",
    issuer: "Oracle",
    date: "October 2025",
    credentialId: "102908362OCI25GAIOCP",
    image: "/OCI25GAI.png",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=AC65BF080328009E178F8F3DBEC095D99D26185143B8088D51C59C258DE1F499",
    certificateUrl: "/OCI_GENAI_eCertificate.pdf",
    color: "bg-gradient-to-r from-neutral-300 to-stone-400 dark:from-slate-500 dark:to-slate-800"
  },
];

const CertificationsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);


  const waveVariant = {
    initial: { rotateY: 0, rotateX: 0 },
    hover: {
      rotateY: [-8, 8, -8, 8, 0],
      rotateX: [3, -2, 3, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="certifications" className="py-16 px-4 relative overflow-hidden">


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-recognized credentials showcasing expertise and commitment to excellence
          </p>
        </motion.div>

        {/* Certifications List */}
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredId(cert.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
                className={`relative bg-gradient-to-br ${cert.color} rounded-3xl overflow-hidden`}
              >
                {/* Gradient Background with Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-tr-full"></div>

                {/* Badge Image - Top Right Corner */}
                <div className="mt-4  md:mt-0 relative flex justify-center md:absolute md:top-4 md:right-4 lg:top-8 lg:right-8 z-20" style={{ perspective: '1000px' }}>
                  <motion.div
                    variants={waveVariant}
                    initial="initial"
                    animate={hoveredId === cert.id ? "hover" : "initial"}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-32 h-32 lg:w-40 lg:h-40"
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Certificate Content */}
                <div className="relative p-6 lg:p-10  md:pr-40 lg:pr-56">
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight   mb-3">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full dark:bg-white/80 bg-black/70"
                    />
                    <p className="text-lg font-semibold">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date and Credential */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Issue Date */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 px-4 py-3 bg-muted/50 dark:bg-white/10 backdrop-blur-sm rounded-xl border dark:border-white/20 border-black/20"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 dark:bg-white/20">
                        <Calendar className="w-4 h-4  " />
                      </div>
                      <div>
                        <p className="text-xs font-semibold  /70 uppercase">Issued</p>
                        <p className="text-sm font-bold  ">{cert.date}</p>
                      </div>
                    </motion.div>

                    {/* Credential ID */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="px-4 py-3 bg-muted/50 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-black/20 dark:border-white/20"
                    >
                      <p className="text-xs font-semibold  uppercase mb-1">Credential ID</p>
                      <p className="text-xs font-mono   truncate">{cert.credentialId}</p>
                    </motion.div>
                  </div>

                  {/* Skills */}
                  {/* @ts-ignore */}
                  {cert.skills?.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold mb-3 uppercase tracking-wide">
                        Skills Validated
                      </p>
                      <div className="flex flex-wrap gap-2">
                         {/* @ts-ignore */}
                        {cert.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-muted/50 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/30 hover:bg-white/30 transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}


                  {/* Verify Button */}
                  <div className='inline-flex gap-4'>
                    <Button size="sm" onClick={() => trackCustomButton('GenAI Certificate Verify')} >
                      <Link
                        href={cert.verifyUrl}
                        className="flex items-center"
                        target="_blank"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Verify
                      </Link>
                    </Button>
                    <Button size="sm" onClick={() => trackCustomButton('GenAI Certificate View')} >
                      <Link
                      // @ts-ignore
                        href={cert.certificateUrl}
                        className="flex items-center"
                        target="_blank"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Certificate
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;