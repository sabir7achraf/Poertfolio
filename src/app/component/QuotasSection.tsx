"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function QuoteSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[rgba(10,20,15,0.95)] to-[rgba(5,25,15,0.9)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full border border-[#37FF8B]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full border border-[#37FF8B]"></div>
                <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full border border-[#37FF8B]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-block p-3 rounded-full bg-[rgba(55,255,139,0.1)] border border-[rgba(55,255,139,0.2)] mb-8">
                        <Quote className="w-8 h-8 text-[#37FF8B]" />
                    </div>

                    <motion.blockquote
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl font-light text-gray-200 leading-relaxed mb-8"
                    >
       <span className="block mb-4">
  &quot;Start with something simple and small, then expand over time. If people call it a &apos;toy&apos; you&apos;re definitely
  onto something.&quot;
</span>
                        <span className="block">
  &quot;If you&apos;re waiting for encouragement from others, you&apos;re doing it wrong. By the time people think an idea
  is good, it&apos;s probably too late.&quot;
</span>
                    </motion.blockquote>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex justify-center items-center"
                    >
                        <div className="h-px w-12 bg-[#37FF8B] opacity-50"></div>
                        <p className="mx-4 text-[#37FF8B] font-medium">My Philosophy</p>
                        <div className="h-px w-12 bg-[#37FF8B] opacity-50"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
