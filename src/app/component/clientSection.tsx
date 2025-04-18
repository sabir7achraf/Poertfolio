"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialProps {
    name: string
    avatar: string
    position: string
    company: string
    testimonial: string
    rating: number
    platform?: string
}

const testimonials: TestimonialProps[] = [
    {
        name: "David Chen",
        avatar: "/placeholder.svg?height=200&width=200",
        position: "CTO",
        company: "TechInnovate",
        testimonial:
            "Working with Sabir was an exceptional experience. His technical expertise and problem-solving skills are outstanding. He delivered our project ahead of schedule and exceeded our expectations. His ability to understand complex requirements and translate them into elegant solutions is remarkable.",
        rating: 5,
        platform: "Upwork",
    },
    {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=200&width=200",
        position: "Product Manager",
        company: "DigitalSphere",
        testimonial:
            "Sabir is one of the most talented developers I've worked with. His attention to detail and commitment to quality are impressive. He not only delivered exactly what we needed but also provided valuable insights that improved our product. I highly recommend him for any challenging software engineering project.",
        rating: 5,
        platform: "Freelancer",
    },
]

export default function ClientsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[rgba(5,25,15,0.9)] to-[rgba(5,30,15,0.85)]">
            <div className="container mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] mb-4">
                        Client Testimonials
                    </h2>
                    <div className="h-1 w-20 bg-[#37FF8B] mx-auto rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)]"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Don't just take my word for it. Here's what clients have to say about working with me.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
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
                        <span>Work With Me</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

function TestimonialCard({ testimonial, index }: { testimonial: TestimonialProps; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.15)] rounded-xl p-8 backdrop-blur-sm hover:border-[rgba(55,255,139,0.3)] transition-all duration-300 group h-full flex flex-col"
        >
            {/* Quote icon - Fixed position and higher z-index */}
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[rgba(55,255,139,0.1)] border border-[rgba(55,255,139,0.2)] flex items-center justify-center z-10">
                <Quote className="w-5 h-5 text-[#37FF8B]" />
            </div>



            {/* Added a proper structure with flex grow to ensure consistent card heights */}
            <div className="flex flex-col h-full">
                {/* Testimonial content with consistent height */}
                <div className="mb-6 text-gray-300 italic leading-relaxed flex-grow min-h-32">
                    "{testimonial.testimonial}"
                </div>

                {/* Bottom section with fixed layout */}
                <div className="mt-auto">
                    {/* Rating */}
                    <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={`${i < testimonial.rating ? "text-[#37FF8B] fill-[#37FF8B]" : "text-gray-600"} mr-1`}
                            />
                        ))}
                    </div>

                    {/* Client info with fixed layout */}
                    <div className="flex items-center">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[rgba(55,255,139,0.3)] mr-4 group-hover:border-[#37FF8B] transition-all duration-300 flex-shrink-0">
                            <Image
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-white font-medium">{testimonial.name}</h4>
                            <p className="text-gray-400 text-sm">
                                {testimonial.position}, {testimonial.company}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative corner - Higher z-index */}
            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[rgba(55,255,139,0.1)] rounded-tl-xl"></div>
            </div>
        </motion.div>
    )
}