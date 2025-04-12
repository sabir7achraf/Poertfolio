import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00ff00, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Main globe
        const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
        const globeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            wireframe: true,
            emissive: 0x002200,
            shininess: 50,
            transparent: true,
            opacity: 0.8
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        // Inner globe
        const innerGlobeGeometry = new THREE.SphereGeometry(1.8, 32, 32);
        const innerGlobeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const innerGlobe = new THREE.Mesh(innerGlobeGeometry, innerGlobeMaterial);
        scene.add(innerGlobe);

        // Create particles
        const particleCount = 200;
        const particles = new THREE.Group();

        // Generate particles with different sizes and colors
        for (let i = 0; i < particleCount; i++) {
            const size = 0.03 + Math.random() * 0.05;
            const particleGeometry = new THREE.SphereGeometry(size, 16, 16);

            // Varying shades of green
            const hue = 0.33 + (Math.random() * 0.1 - 0.05); // Green in HSL
            const saturation = 0.7 + Math.random() * 0.3;
            const lightness = 0.4 + Math.random() * 0.3;

            const color = new THREE.Color().setHSL(hue, saturation, lightness);

            const particleMaterial = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color.clone().multiplyScalar(0.3),
                shininess: 80
            });

            const particle = new THREE.Mesh(particleGeometry, particleMaterial);

            // Position particles in a sphere formation
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            particle.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            // Store original position for animation
            particle.userData = {
                originalPosition: particle.position.clone(),
                speed: 0.2 + Math.random() * 0.8,
                offset: Math.random() * Math.PI * 2
            };

            particles.add(particle);
        }
        scene.add(particles);

        // Create connection lines between particles
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.2
        });

        const connections = new THREE.Group();
        scene.add(connections);

        // Camera positioning
        camera.position.z = 7;

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Rotate the globes
            globe.rotation.y += 0.003;
            innerGlobe.rotation.y -= 0.002;

            // Animate particles
            particles.children.forEach((particle: THREE.Mesh, index) => {
                const userData = particle.userData;
                const orbitSpeed = userData.speed * 0.2;

                // Create flowing motion
                particle.position.x = userData.originalPosition.x + Math.sin(time * orbitSpeed + userData.offset) * 0.3;
                particle.position.y = userData.originalPosition.y + Math.cos(time * orbitSpeed + userData.offset) * 0.3;
                particle.position.z = userData.originalPosition.z + Math.sin(time * orbitSpeed * 0.5 + userData.offset) * 0.3;

                // Pulse size
                const scaleFactor = 1 + Math.sin(time + index * 0.1) * 0.2;
                particle.scale.setScalar(scaleFactor);
            });

            // Update connections
            connections.children.forEach(line => {
                line.geometry.dispose();
            });
            connections.clear();

            // Connect nearby particles
            for (let i = 0; i < particles.children.length; i++) {
                const p1 = particles.children[i];

                for (let j = i + 1; j < particles.children.length; j++) {
                    const p2 = particles.children[j];
                    const distance = p1.position.distanceTo(p2.position);

                    if (distance < 1) {
                        const lineGeometry = new THREE.BufferGeometry().setFromPoints([p1.position, p2.position]);
                        const line = new THREE.Line(lineGeometry, linesMaterial);
                        line.material.opacity = 0.5 - distance * 0.5; // Fade with distance
                        connections.add(line);
                    }
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);

            // Dispose geometries and materials
            globeGeometry.dispose();
            globeMaterial.dispose();
            innerGlobeGeometry.dispose();
            innerGlobeMaterial.dispose();

            particles.children.forEach(p => {
                p.geometry.dispose();
                (p.material as THREE.MeshPhongMaterial).dispose();
            });

            connections.children.forEach(line => {
                line.geometry.dispose();
                (line.material as THREE.LineBasicMaterial).dispose();
            });

            renderer.dispose();
        };
    }, []);

    return (
        <section className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />

            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <span className={styles.greeting}>Hello, I'm</span>
                        <h1 className={styles.title}>Sabir Achraf</h1>
                        <div className={styles.roleWrapper}>
                            <span className={styles.rolePrefix}>I'm a</span>
                            <div className={styles.roles}>
                                <span>Software Engineer</span>
                                <span>Full Stack Developer</span>
                                <span>Problem Solver</span>
                                <span>Tech Enthusiast</span>
                            </div>
                        </div>
                        <p className={styles.description}>
                            Crafting scalable, innovative solutions with a passion for clean code and performance optimization.
                        </p>

                        <div className={styles.buttons}>
                            <a
                                href="/files/sabir-cv.pdf"
                                download
                                className={`${styles.button} ${styles.primaryButton}`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <span>Download CV</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </a>
                            <button
                                className={`${styles.button} ${styles.secondaryButton}`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <span>Let's Talk</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className={styles.socialLinks}>
                            <a href="https://github.com/sabir7achraf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a href="https://leetcode.com/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                                    <path d="m14.5 5.5 3 3"></path>
                                </svg>
                            </a>
                            <a href="https://hackerrank.com/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.imageContainer}>
                            <img src="/images/sabir.jpeg" alt="Sabir Achraf" className={styles.image} />
                            <div className={styles.imageGlow}></div>
                            <div className={styles.imageRing}></div>
                        </div>
                    </div>
                </div>

                <div className={styles.scrollIndicator}>
                    <span>Scroll Down</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;