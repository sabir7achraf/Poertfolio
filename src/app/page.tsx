"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Terminal from "@/app/component/Terminal"
import Hero from "@/app/component/HeroSection"
import ProjectCard from "@/app/component/ProjectCard"
import TimelineItem from "@/app/component/timelLine"
import CertificationItem from "@/app/component/certification"
import ToolItem from "@/app/component/toolItem"
import ContactForm from "@/app/component/contactForm"
import QuoteSection from "@/app/component/QuotasSection"
import ClientsSection from "@/app/component/clientSection"
import {
    CodeIcon,
    DatabaseIcon,
    ServerIcon,
    GlobeIcon,
    CloudIcon,
    LayoutIcon,
    BoxIcon,
    GitBranchIcon,
} from "lucide-react"

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)

    const handleTerminalComplete = () => {
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {isLoading ? (
                <Terminal onComplete={handleTerminalComplete} />
            ) : (
                <>
                    <Hero />

                    {/* Projects Section */}
                    <section className="py-20 bg-gradient-to-b from-[rgba(10,10,10,1)] to-[rgba(10,20,15,0.95)]">
                        <div className="container mx-auto px-6 lg:px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                                    Projects
                                </h2>
                                <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <ProjectCard
                                    image="/images/oracle.jpeg"
                                    title="Oracle DataBase simulations"
                                    description="Simulations of oracle database fonctionalité like CRUD for users ,RMAN ,TDE , VPD , rapports AWR/ASH "
                                    technologies={["Next.js", "TypeScript", "Tailwind CSS","spring boot "]}
                                    githubUrl="https://github.com/username/portfolio"
                                    demo="https://www.linkedin.com/posts/achraf-sabir7_oracledatabase-daezveloppement-basededonnaezes-activity-7288787552042405888-qxif?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcFeVIBQU3UsxytK90UUkcQlw-rkFDiT08"
                                />
                                <ProjectCard
                                    image="/images/fintech.png"
                                    title="Fintech  Platform"
                                    description="cloud-native FinTech application designed to deliver secure, efficient, and scalable financial services. The application is based on a microservices architecture and includes predictive models for loan approval and insurance management. It also provides separate frontend applications for admin and client dashboards.   "
                                    technologies={["Docker ", "Kubernetes ", "Terraform", "Aws"]}
                                    githubUrl="https://github.com/projet-fintech"
                                    demo= "https://www.linkedin.com/posts/achraf-sabir7_aws-kubernetes-devops-activity-7289545222370279424-wk05?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcFeVIBQU3UsxytK90UUkcQlw-rkFDiT08"/>

                                <ProjectCard
                                    title="AI Content Generator"
                                    description="An application that leverages AI to generate content for various purposes including blog posts and social media."
                                    technologies={["Python", "TensorFlow", "Flask", "React"]}
                                    demo="https://ai-generator.example.com"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Quote Section - Added */}
                    <QuoteSection />

                    {/* Education Timeline */}
                    <section className="py-20 bg-gradient-to-b from-[rgba(5,25,15,0.9)] to-[rgba(5,30,15,0.85)]">
                        <div className="container mx-auto px-6 lg:px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                                    Education
                                </h2>
                                <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                            </motion.div>

                            <div className="relative max-w-4xl mx-auto">
                                {/* Timeline line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[rgba(55,255,139,0.2)] via-[rgba(55,255,139,0.8)] to-[rgba(55,255,139,0.2)]"></div>

                                <TimelineItem
                                    date="2018 - 2022"
                                    title="Bachelor's in Computer Science"
                                    institution="University Name"
                                    description="Focused on software engineering, algorithms, and data structures. Graduated with honors."
                                    position="left"
                                />

                                <TimelineItem
                                    date="2016 - 2018"
                                    title="High School Diploma"
                                    institution="School Name"
                                    description="Advanced courses in mathematics and computer science."
                                    position="right"
                                />

                                <TimelineItem
                                    date="2015 - 2016"
                                    title="Web Development Bootcamp"
                                    institution="Tech Academy"
                                    description="Intensive training in full-stack web development technologies."
                                    position="left"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Clients Section - Added */}
                    <ClientsSection />

                    {/* Certifications Section */}
                    <section className="py-20 bg-gradient-to-b from-[rgba(5,30,15,0.85)] to-[rgba(5,35,15,0.8)]">
                        <div className="container mx-auto px-6 lg:px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                                    Certifications
                                </h2>
                                <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                <CertificationItem
                                    title="AWS Certified Solutions Architect"
                                    issuer="Amazon Web Services"
                                    date="Issued Jan 2023"
                                    credentialUrl="https://www.credly.com/badges/example"
                                />
                                <CertificationItem
                                    title="Google Cloud Professional DevOps Engineer"
                                    issuer="Google Cloud"
                                    date="Issued Mar 2022"
                                    credentialUrl="https://www.credential.net/example"
                                />
                                <CertificationItem
                                    title="Microsoft Certified: Azure Developer Associate"
                                    issuer="Microsoft"
                                    date="Issued Jun 2022"
                                />
                                <CertificationItem
                                    title="Certified Kubernetes Administrator (CKA)"
                                    issuer="Cloud Native Computing Foundation"
                                    date="Issued Sep 2021"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Tools Section */}
                    <section className="py-20 bg-gradient-to-b from-[rgba(5,35,15,0.8)] to-[rgba(5,40,15,0.75)]">
                        <div className="container mx-auto px-6 lg:px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                                    Tools & Technologies
                                </h2>
                                <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                            </motion.div>

                            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                <ToolItem name="Kubernetes" icon={<CloudIcon size={16} />} />
                                <ToolItem name="Docker" icon={<BoxIcon size={16} />} />
                                <ToolItem name="Terraform" icon={<ServerIcon size={16} />} />
                                <ToolItem name="Ansible" icon={<GlobeIcon size={16} />} />
                                <ToolItem name="Java" icon={<CodeIcon size={16} />} />
                                <ToolItem name="React" icon={<LayoutIcon size={16} />} />
                                <ToolItem name="Next.js" icon={<CodeIcon size={16} />} />
                                <ToolItem name="TypeScript" icon={<CodeIcon size={16} />} />
                                <ToolItem name="Node.js" icon={<ServerIcon size={16} />} />
                                <ToolItem name="MongoDB" icon={<DatabaseIcon size={16} />} />
                                <ToolItem name="PostgreSQL" icon={<DatabaseIcon size={16} />} />
                                <ToolItem name="Git" icon={<GitBranchIcon size={16} />} />
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="py-20 bg-gradient-to-b from-[rgba(5,40,15,0.75)] to-[rgba(5,45,15,0.7)]">
                        <div className="container mx-auto px-6 lg:px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                                    Contact Me
                                </h2>
                                <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                                    Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                                </p>
                            </motion.div>

                            <ContactForm />
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}
