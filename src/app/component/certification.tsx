"use client"

import { motion } from "framer-motion"
import { AwardIcon } from "lucide-react"

interface CertificationItemProps {
    title: string
    issuer: string
    date: string
    credentialUrl?: string
}

export default function CertificationItem({ title, issuer, date, credentialUrl }: CertificationItemProps) {
    return (
        <motion.div
            className="relative bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.2)] rounded-lg p-5 shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.3)", borderColor: "rgba(55,255,139,0.4)" }}
>
    {/* Left border accent */}
    <div className="absolute top-0 left-0 w-1 h-full bg-[#37FF8B] shadow-[0_0_10px_rgba(55,255,139,0.6)]" />

    <div className="flex items-start gap-4">
    <div className="p-2 rounded-full bg-[rgba(55,255,139,0.1)] border border-[rgba(55,255,139,0.2)]">
    <AwardIcon className="w-6 h-6 text-[#37FF8B]" />
    </div>
    <div>
    <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-gray-400">{issuer}</p>
        <p className="text-sm text-gray-500 mt-1">{date}</p>

    {credentialUrl && (
        <a
            href={credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-sm text-[#37FF8B] hover:underline"
            >
            View Credential
    </a>
    )}
    </div>
    </div>
    </motion.div>
)
}
