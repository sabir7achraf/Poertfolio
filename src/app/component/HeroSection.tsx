"use client"

import { useEffect, useRef} from "react"
import Image from "next/image"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { Github, Linkedin, Code2Icon, AwardIcon } from "lucide-react"

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 7

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Add subtle controls for mobile interaction
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5

        // Post-processing for glow effects
        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8, // strength
            0.3, // radius
            0.7, // threshold
        )
        composer.addPass(bloomPass)

        // Create the main globe structure
        const createGlobe = () => {
            // Core sphere
            const coreGeometry = new THREE.IcosahedronGeometry(1.8, 2)
            const coreMaterial = new THREE.MeshBasicMaterial({
                color: 0x37ff8b,
                wireframe: true,
                transparent: true,
                opacity: 0.4,
            })
            const core = new THREE.Mesh(coreGeometry, coreMaterial)
            scene.add(core)

            // Outer sphere
            const outerGeometry = new THREE.IcosahedronGeometry(2.2, 1)
            const outerMaterial = new THREE.MeshBasicMaterial({
                color: 0x37ff8b,
                wireframe: true,
                transparent: true,
                opacity: 0.2,
            })
            const outer = new THREE.Mesh(outerGeometry, outerMaterial)
            scene.add(outer)

            // Add rotation animation
            const animateGlobe = () => {
                core.rotation.y += 0.001
                core.rotation.x += 0.0005
                outer.rotation.y -= 0.0008
                outer.rotation.z += 0.0003
            }

            return { core, outer, animateGlobe }
        }

        // Create particles system
        const createParticles = () => {
            const particleCount = 150
            const particles = new THREE.Group()
            const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8)

            // Create particles with different colors
            for (let i = 0; i < particleCount; i++) {
                // Alternate between main color and white for particles
                const color = i % 3 === 0 ? 0xffffff : 0x37ff8b
                const particleMaterial = new THREE.MeshBasicMaterial({
                    color,
                    transparent: true,
                    opacity: 0.8,
                })

                const particle = new THREE.Mesh(particleGeometry, particleMaterial)

                // Distribute particles in a sphere with some randomness
                const radius = 2.5 + Math.random() * 2
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)

                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.sin(phi) * Math.sin(theta)
                const z = radius * Math.cos(phi)

                particle.position.set(x, y, z)
                particle.userData = {
                    originalPosition: new THREE.Vector3(x, y, z),
                    radius,
                    theta,
                    phi,
                    speed: 0.2 + Math.random() * 0.3,
                    amplitude: 0.2 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                }

                particles.add(particle)
            }

            scene.add(particles)

            // Animate particles
            const animateParticles = (time: number) => {
                particles.children.forEach((particle, index) => {
                    const data = particle.userData

                    // Create flowing motion
                    const orbitRadius = data.radius + Math.sin(time * 0.2 + data.phase) * data.amplitude
                    const theta = data.theta + time * data.speed * 0.05
                    const phi = data.phi + Math.sin(time * 0.1 + index) * 0.05

                    particle.position.x = orbitRadius * Math.sin(phi) * Math.cos(theta)
                    particle.position.y = orbitRadius * Math.sin(phi) * Math.sin(theta)
                    particle.position.z = orbitRadius * Math.cos(phi)

                    // Pulse effect
                    const scale = 0.8 + Math.sin(time * 2 + index * 5) * 0.2
                    particle.scale.set(scale, scale, scale)

                    // Adjust opacity for depth effect
                    const dist = camera.position.distanceTo(particle.position)
                    const normalizedDist = Math.max(0, Math.min(1, (10 - dist) / 10))
                    ;(particle.material as THREE.MeshBasicMaterial).opacity = normalizedDist * 0.8
                })
            }

            return { particles, animateParticles }
        }

        // Create dynamic connections between particles
        const createConnections = () => {
            const connections = new THREE.Group()
            scene.add(connections)

            // Line material with custom shader for gradient effect
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x37ff8b,
                transparent: true,
                opacity: 0.3,
            })

            // Update connections between particles
            const updateConnections = (particles: THREE.Group, time: number) => {
                // Remove old connections
                while (connections.children.length > 0) {
                    const line = connections.children[0]
                    connections.remove(line)
                    ;(line as THREE.Line).geometry.dispose()
                    ;(line as THREE.Line).material.dispose()
                }

                // Dynamic connection distance based on time
                const maxDistance = 1.2 + Math.sin(time * 0.5) * 0.3

                // Create new connections
                for (let i = 0; i < particles.children.length; i++) {
                    const p1 = particles.children[i].position

                    // Limit connections per particle for performance
                    let connectionCount = 0
                    const maxConnectionsPerParticle = 3

                    for (let j = i + 1; j < particles.children.length; j++) {
                        if (connectionCount >= maxConnectionsPerParticle) break

                        const p2 = particles.children[j].position
                        const distance = p1.distanceTo(p2)

                        if (distance < maxDistance) {
                            // Calculate opacity based on distance
                            const opacity = 1 - distance / maxDistance

                            // Create line geometry
                            const lineGeometry = new THREE.BufferGeometry().setFromPoints([p1, p2])
                            const material = lineMaterial.clone()
                            material.opacity = opacity * 0.5

                            const line = new THREE.Line(lineGeometry, material)
                            connections.add(line)

                            connectionCount++
                        }
                    }
                }
            }

            return { connections, updateConnections }
        }

        // Initialize all components
        const globe = createGlobe()
        const { particles, animateParticles } = createParticles()
        const { updateConnections } = createConnections()

        // Main animation loop
        const animate = () => {
            const time = Date.now() * 0.001

            requestAnimationFrame(animate)

            // Update all animations
            globe.animateGlobe()
            animateParticles(time)
            updateConnections(particles, time)

            // Update controls
            controls.update()

            // Render scene with post-processing
            composer.render()
        }

        animate()

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height)
            composer.setSize(width, height)
        }

        window.addEventListener("resize", handleResize)

        // Clean up on unmount
        return () => {
            window.removeEventListener("resize", handleResize)

            // Dispose of all geometries and materials
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose()
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose())
                    } else {
                        object.material.dispose()
                    }
                }
            })

            renderer.dispose()
            composer.dispose()
        }
    }, [])

    return (
        <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
            {/* 3D Canvas */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[1]" />

            {/* Content Container */}
            <div className="relative z-10 w-full h-screen flex items-center justify-center px-[10%] bg-gradient-to-br from-[rgba(10,10,10,0.9)] to-[rgba(5,15,10,0.7)]">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 animate-fade-in">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        {/* Name with animated underline */}
                        <div className="relative inline-block mb-2">
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#37FF8B] tracking-tight">
                                Sabir Achraf
                            </h1>
                            <div className="absolute bottom-[-10px] left-0 h-1 w-16 bg-[#37FF8B] rounded-full shadow-[0_0_10px_rgba(55,255,139,0.6)] animate-bar-pulse"></div>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                            Software Engineer crafting scalable, innovative solutions with a passion for cutting-edge technologies.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-6 mt-2">
                            <a
                                href="/files/sabirachraf_cv.pdf"
                                download
                                className="group relative overflow-hidden rounded-lg bg-[#37FF8B]/10 border border-[#37FF8B]/20 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#37FF8B]/20 hover:shadow-[0_0_20px_rgba(55,255,139,0.3)]"

                            >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Download CV</span>
                  <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 00-1 1v5H6a1 1 0 100 2h3v5a1 1 0 102 0v-5h3a1 1 0 100-2h-3V4a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                  </svg>
                </span>
                                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#37FF8B] transition-all duration-300 group-hover:w-full"></span>
                            </a>

                            <button
                                className="group relative overflow-hidden rounded-lg bg-transparent border border-white/20 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/30"

                            >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Let &apos; s Talk</span>
                  <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                  </svg>
                </span>
                                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-5 mt-4">
                            <a
                                href="https://github.com/sabir7achraf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-[#37FF8B]/10 hover:border-[#37FF8B]/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(55,255,139,0.2)]"
                            >
                                <Github className="w-5 h-5 text-white group-hover:text-[#37FF8B]" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/achraf-sabir7/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-[#37FF8B]/10 hover:border-[#37FF8B]/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(55,255,139,0.2)]"
                            >
                                <Linkedin className="w-5 h-5 text-white group-hover:text-[#37FF8B]" />
                            </a>
                            <a
                                href="https://leetcode.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-[#37FF8B]/10 hover:border-[#37FF8B]/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(55,255,139,0.2)]"
                            >
                                <Code2Icon className="w-5 h-5 text-white group-hover:text-[#37FF8B]" />
                            </a>
                            <a
                                href="https://hackerrank.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-[#37FF8B]/10 hover:border-[#37FF8B]/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(55,255,139,0.2)]"
                            >
                                <AwardIcon className="w-5 h-5 text-white group-hover:text-[#37FF8B]" />
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative group">
                            {/* Main Image */}
                            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-[#37FF8B] shadow-[0_0_30px_rgba(55,255,139,0.3)] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(55,255,139,0.5)] group-hover:scale-[1.02]">
                                <Image
                                    width={320}
                                    height={320}
                                    src="/images/sabir.jpeg"
                                    alt="Sabir Achraf"
                                    className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] object-cover"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-[-15px] right-[-15px] w-[100px] h-[100px] border-t-2 border-r-2 border-[#37FF8B] rounded-tr-lg opacity-70"></div>
                            <div className="absolute bottom-[-15px] left-[-15px] w-[100px] h-[100px] border-b-2 border-l-2 border-[#37FF8B] rounded-bl-lg opacity-70"></div>

                            {/* Animated dots */}
                            <div className="absolute top-[20%] right-[-20px] w-3 h-3 rounded-full bg-[#37FF8B] animate-pulse-slow"></div>
                            <div className="absolute bottom-[20%] left-[-20px] w-3 h-3 rounded-full bg-[#37FF8B] animate-pulse-slow delay-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
