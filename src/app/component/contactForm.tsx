"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { SendIcon } from "lucide-react"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Reset form
        setFormData({ name: "", email: "", message: "" })
        setIsSubmitting(false)

        // You would typically send the data to your backend here
        console.log("Form submitted:", formData)
    }

    return (
        <motion.form
            className="max-w-[600px] mx-auto mt-10 bg-[rgba(15,25,20,0.6)] border border-[rgba(55,255,139,0.2)] rounded-xl p-8 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
        >
            <div className="mb-6 relative">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[rgba(10,10,10,0.6)] border border-[rgba(55,255,139,0.2)] rounded-md text-white focus:outline-none focus:border-[rgba(55,255,139,0.6)] focus:shadow-[0_0_10px_rgba(55,255,139,0.3)] transition-all duration-300"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-gray-400 transition-all duration-300 pointer-events-none"
                    style={{
                        transform: formData.name ? "translateY(-24px) scale(0.8)" : "translateY(0) scale(1)",
                        transformOrigin: "left top",
                        backgroundColor: formData.name ? "rgba(10,10,10,0.8)" : "transparent",
                        padding: formData.name ? "0 4px" : "0",
                        color: formData.name ? "#37FF8B" : "inherit",
                    }}
                >
                    Your Name
                </label>
            </div>

            <div className="mb-6 relative">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[rgba(10,10,10,0.6)] border border-[rgba(55,255,139,0.2)] rounded-md text-white focus:outline-none focus:border-[rgba(55,255,139,0.6)] focus:shadow-[0_0_10px_rgba(55,255,139,0.3)] transition-all duration-300"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-400 transition-all duration-300 pointer-events-none"
                    style={{
                        transform: formData.email ? "translateY(-24px) scale(0.8)" : "translateY(0) scale(1)",
                        transformOrigin: "left top",
                        backgroundColor: formData.email ? "rgba(10,10,10,0.8)" : "transparent",
                        padding: formData.email ? "0 4px" : "0",
                        color: formData.email ? "#37FF8B" : "inherit",
                    }}
                >
                    Your Email
                </label>
            </div>

            <div className="mb-6 relative">
        <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-[rgba(10,10,10,0.6)] border border-[rgba(55,255,139,0.2)] rounded-md text-white focus:outline-none focus:border-[rgba(55,255,139,0.6)] focus:shadow-[0_0_10px_rgba(55,255,139,0.3)] transition-all duration-300 resize-y"
            placeholder=" "
            required
        />
                <label
                    htmlFor="message"
                    className="absolute left-4 top-3 text-gray-400 transition-all duration-300 pointer-events-none"
                    style={{
                        transform: formData.message ? "translateY(-24px) scale(0.8)" : "translateY(0) scale(1)",
                        transformOrigin: "left top",
                        backgroundColor: formData.message ? "rgba(10,10,10,0.8)" : "transparent",
                        padding: formData.message ? "0 4px" : "0",
                        color: formData.message ? "#37FF8B" : "inherit",
                    }}
                >
                    Your Message
                </label>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden px-6 py-3 bg-[rgba(55,255,139,0.2)] text-white border border-[rgba(55,255,139,0.4)] rounded-md font-medium hover:bg-[rgba(55,255,139,0.3)] hover:shadow-[0_0_15px_rgba(55,255,139,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
          <span className="flex items-center gap-2">
            {isSubmitting ? "Sending..." : "Send Message"}
              <SendIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#37FF8B] transition-all duration-300 group-hover:w-full"></span>
                </button>
            </div>
        </motion.form>
    )
}
