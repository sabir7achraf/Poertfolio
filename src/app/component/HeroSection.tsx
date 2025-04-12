import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
        const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        const particleCount = 100;
        const particles = new THREE.Group();
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            particle.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            particles.add(particle);
        }
        scene.add(particles);

        camera.position.z = 7;

        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            particles.children.forEach((particle, index) => {
                const time = Date.now() * 0.001;
                const orbitSpeed = 0.5 + index * 0.01;
                particle.position.x = Math.sin(time * orbitSpeed) * 4;
                particle.position.z = Math.cos(time * orbitSpeed) * 4;
                particle.scale.setScalar(1 + Math.sin(time + index) * 0.3);
            });
            particles.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            scene.remove(globe, particles);
            globeGeometry.dispose();
            globeMaterial.dispose();
            particles.children.forEach(p => {
                p.geometry.dispose();
                (p.material as THREE.MeshBasicMaterial).dispose();
            });
            renderer.dispose();
        };
    }, []);

    return (
        <section className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.container}>
                <div className={`${styles.content} animate-fade-in`}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Sabir Achraf</h1>
                        <p className={styles.description}>
                            Software Engineer crafting scalable, innovative solutions.
                        </p>
                        <div className={styles.buttons}>
                            <a href="/files/sabir-cv.pdf" download className={styles.button}>
                <span className={styles.hoverText} data-text="Download CV">
                  Download CV
                </span>
                            </a>
                            <button className={styles.button}>
                <span className={styles.hoverText} data-text="Let’s Talk">
                  Let’s Talk
                </span>
                            </button>
                        </div>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com/sabir7achraf" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/github.svg" alt="GitHub" className={styles.socialIcon} />
                            </a>
                            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                            </a>
                            <a href="https://leetcode.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/leetcode.svg" alt="LeetCode" className={styles.socialIcon} />
                            </a>
                            <a href="https://hackerrank.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/hackerrank.svg" alt="HackerRank" className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <img src="/images/sabir.jpeg" alt="Sabir Achraf" className={styles.image} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;