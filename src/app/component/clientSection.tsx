"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

interface ClientProps {
    name: string
    logo: string
    industry: string
}

const clients: ClientProps[] = [
    {
        name: "TechCorp",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Software Development",
    },
    {
        name: "GreenEnergy",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Renewable Energy",
    },
    {
        name: "FinanceHub",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Financial Services",
    },
    {
        name: "HealthPlus",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Healthcare",
    },
    {
        name: "EduLearn",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Education",
    },
    {
        name: "RetailPro",
        logo: "/placeholder.svg?height=80&width=80",
        industry: "Retail",
    },
]

export default function ClientsSection() {
    return (
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
                        Clients
                    </h2>
                    <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        I've had the privilege of working with amazing clients across various industries.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
                    {clients.map((client, index) => (
                        <ClientCard key={index} client={client} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(55,255,139,0.1)] border border-[rgba(55,255,139,0.3)] rounded-lg text-white hover:bg-[rgba(55,255,139,0.2)] transition-all duration-300"
                    >
                        <Users size={18} />
                        <span>Become a Client</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

function ClientCard({ client, index }: { client: ClientProps; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center justify-center p-4 bg-[rgba(15,25,20,0.4)] border border-[rgba(55,255,139,0.1)] rounded-lg hover:border-[rgba(55,255,139,0.3)] transition-all duration-300"
        >
            <div className="w-16 h-16 mb-3 rounded-full bg-[rgba(55,255,139,0.05)] p-2 flex items-center justify-center">
                <img src={client.logo || "/placeholder.svg"} alt={client.name} className="w-10 h-10 object-contain" />
            </div>
            <h3 className="text-sm font-medium text-white mb-1">{client.name}</h3>
            <p className="text-xs text-gray-400">{client.industry}</p>
        </motion.div>
    )
}
