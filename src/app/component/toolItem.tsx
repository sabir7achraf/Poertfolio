"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ToolItemProps {
    name: string
    icon?: ReactNode
}

export default function ToolItem({ name, icon }: ToolItemProps) {
    return (
        <motion.div
            className="bg-[rgba(10,20,15,0.6)] border border-[rgba(55,255,139,0.2)] rounded-full px-4 py-2 text-white font-medium shadow-md flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
                y: -3,
                backgroundColor: "rgba(55,255,139,0.15)",
                borderColor: "rgba(55,255,139,0.4)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
        >
            {icon}
            {name}
        </motion.div>
    )
}
