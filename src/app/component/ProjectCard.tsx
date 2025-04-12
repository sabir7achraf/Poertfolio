"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
    title: string
    description: string
    image?: string
    technologies?: string[]
    githubUrl?: string
    liveUrl?: string
}

export default function ProjectCard({
                                        title,
                                        description,
                                        image = "/placeholder.svg?height=300&width=500",
                                        technologies = ["Next.js", "TypeScript", "Tailwind CSS"],
                                        githubUrl,
                                        liveUrl,
                                    }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative overflow-hidden rounded-xl bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.2)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-[200px] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.8)] to-transparent" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-[rgba(55,255,139,0.1)] text-[#37FF8B] border border-[rgba(55,255,139,0.2)]"
                        >
              {tech}
            </span>
                    ))}
                </div>

                <div className="flex gap-3 mt-4">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(55,255,139,0.1)] hover:border-[rgba(55,255,139,0.3)] transition-all duration-300"
                        >
                            <GithubIcon size={18} />
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(55,255,139,0.1)] hover:border-[rgba(55,255,139,0.3)] transition-all duration-300"
                        >
                            <ExternalLinkIcon size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute transform rotate-45 bg-[#37FF8B] text-[#111] font-medium py-1 right-[-35px] top-[20px] w-[170px] text-center text-xs">
                    Featured
                </div>
            </div>
        </motion.div>
    )
}
