"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
    date: string
    title: string
    institution: string
    description?: string
    position: "left" | "right"
}

export default function TimelineItem({ date, title, institution, description, position }: TimelineItemProps) {
    return (
        <div className="relative mb-16 w-full flex justify-center">
            <motion.div
                className={`w-[45%] p-5 bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.2)] rounded-lg shadow-lg relative backdrop-blur-sm ${
                    position === "left" ? "mr-[55%]" : "ml-[55%]"
                }`}
                initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.4)", borderColor: "rgba(55,255,139,0.4)" }}
            >
        <span className="inline-block px-3 py-1 bg-[rgba(55,255,139,0.15)] rounded text-sm text-[#37FF8B] mb-2">
          {date}
        </span>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <p className="text-gray-400 mb-3">{institution}</p>
                {description && <p className="text-gray-300">{description}</p>}

                {/* Timeline dot */}
                <div
                    className={`absolute top-5 w-5 h-5 bg-[#37FF8B] rounded-full shadow-[0_0_10px_rgba(55,255,139,0.8)] z-10 ${
                        position === "left" ? "right-[-62px]" : "left-[-62px]"
                    }`}
                />
            </motion.div>
        </div>
    )
}
