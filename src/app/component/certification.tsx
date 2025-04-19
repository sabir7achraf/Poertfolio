"use client"

import { motion } from "framer-motion"
import { AwardIcon, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CertificationItemProps {
    title: string
    issuer: string
    date: string
    credentialUrl?: string
    imageUrl?: string
}

export default function CertificationItem({
                                              title,
                                              issuer,
                                              date,
                                              credentialUrl,
                                              imageUrl
                                          }: CertificationItemProps) {
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    return (
        <motion.div
            className="relative bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.2)] rounded-lg p-5 shadow-lg overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.3)", borderColor: "rgba(55,255,139,0.4)" }}
        >
            {/* Left border accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#37FF8B] shadow-[0_0_10px_rgba(55,255,139,0.6)]" />

            {/* Header with title and icon */}
            <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-full bg-[rgba(55,255,139,0.1)] border border-[rgba(55,255,139,0.2)]">
                    <AwardIcon className="w-6 h-6 text-[#37FF8B]" />
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="text-gray-400">{issuer}</p>
                    <p className="text-sm text-gray-500 mt-1">{date}</p>
                </div>
            </div>

            {/* Certificate Image - Large and clickable */}
            {imageUrl && (
                <div className="mt-4 mb-4 w-full">
                    <div
                        className="relative w-full h-48 rounded-md overflow-hidden border-2 border-[rgba(55,255,139,0.2)] cursor-pointer group-hover:border-[rgba(55,255,139,0.4)] transition-all duration-300"
                        onClick={() => setIsImageExpanded(!isImageExpanded)}
                    >
                        <Image
                            src={imageUrl}
                            alt={`${title} certificate`}
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
              <span className="opacity-0 group-hover:opacity-100 text-black text-sm font-medium py-1 px-3 rounded-full bg-[rgba(55,255,10,0.2)] transition-opacity duration-300">
                {isImageExpanded ? "Click to shrink" : "Click to expand"}
              </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded image modal */}
            {isImageExpanded && imageUrl && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsImageExpanded(false)}
                >
                    <div className="relative w-full max-w-4xl h-auto max-h-[80vh] rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={`${title} certificate`}
                            width={1200}
                            height={800}
                            className="object-contain w-full h-full"
                        />
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-[rgba(0,0,0,0.5)] text-white hover:bg-[rgba(55,255,139,0.3)]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageExpanded(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Credential Link */}
            {credentialUrl && (
                <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-[#37FF8B] hover:underline"
                >
                    <span>View Credential</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </motion.div>
    )
}