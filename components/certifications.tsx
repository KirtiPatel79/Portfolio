import React from 'react';
import { Calendar, CheckCircle, ExternalLink } from 'lucide-react';

// Mock data - replace with your actual data
const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "March 2024",
    credentialId: "AWS-ASA-12345",
    image: "/OCI25GAI.png",
    verifyUrl: "#",
    skills: ["Cloud Architecture", "AWS", "Infrastructure", "Security"]
  },
  // {
  //   id: 2,
  //   title: "Professional Scrum Master I",
  //   issuer: "Scrum.org",
  //   date: "January 2024",
  //   credentialId: "PSM-I-67890",
  //   image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop",
  //   verifyUrl: "#",
  //   skills: ["Agile", "Scrum", "Project Management", "Team Leadership"]
  // }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-10">
      <div
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          animation: 'fadeInView 0.5s ease-out forwards'
        }}
      >
        <h2 className="text-3xl text-center font-bold mb-10">Certifications</h2>

        <div className="grid gap-10">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInView 0.5s ease-out forwards ${index * 0.1}s`
              }}
              className="grid md:grid-cols-2 gap-6 border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              {/* Badge Image */}
              <div className="overflow-hidden relative h-[300px] md:h-full border-b md:border-b-0 md:border-r bg-gray-50 dark:bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-8 h-8 text-green-500 drop-shadow-lg" />
                </div>
              </div>

              {/* Certification Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Issued {cert.date}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-1">CREDENTIAL ID</h4>
                  <p className="text-sm font-mono text-muted-foreground">
                    {cert.credentialId}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Verify Button */}
                <div className="pt-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
                  >
                    Verify Credential
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInView {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;