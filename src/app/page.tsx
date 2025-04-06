'use client'
// import { useState } from 'react';
// import Terminal from '@/app/component/Terminal';
import styles from '@/app/component/Home.module.css';
import Hero from "@/app/component/HeroSection";
import ProjectCard from "@/app/component/Card"; // New CSS module

export default function Home() {
  {/* const [isLoading, setIsLoading] = useState(true);

  const handleTerminalComplete = () => {
    setIsLoading(false);
  };
*/}
  return (
      <div className={styles.container}>

        {/* {isLoading ? (
            <Terminal onComplete={handleTerminalComplete} />
        ) : (<> */ }


        <Hero />
        <section className={styles.projects}>
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <div className="flex flex-wrap justify-center gap-6 px-[10%]">
            <ProjectCard
                title="Portfolio Website"
                description="A personal portfolio built with Next.js and TypeScript."
            />
            <ProjectCard
                title="Project Two"
                description="Description of another project goes here."
            />
          </div>
        </section>
              {/* Education Timeline */}
              <section className={styles.timeline}>
                <h2>Education</h2>
                <div className={styles.timelineContainer}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDate}>2018 - 2022</span>
                    <h3> Bachelor s in Computer Science</h3>
                    <p>University Name</p>
                  </div>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDate}>2016 - 2018</span>
                    <h3>High School Diploma</h3>
                    <p>School Name</p>
                  </div>
                </div>
              </section>

              {/* Certifications Section */}
              <section className={styles.certifications}>
                <h2>Certifications</h2>
                <ul>
                  <li>AWS Certified Solutions Architect</li>
                  <li>Google Cloud Professional DevOps Engineer</li>
                </ul>
              </section>

              {/* Tools Section */}
              <section className={styles.tools}>
                <h2>Tools & Technologies</h2>
                <div className={styles.toolsGrid}>
                  <span>Kubernetes</span>
                  <span>Docker</span>
                  <span>Terraform</span>
                  <span>Ansible</span>
                  <span>Java</span>
                  <span>React</span>
                  <span>Next.js</span>
                </div>
              </section>

              {/* Contact Section */}
              <section className={styles.contact}>
                <h2>Contact Me</h2>
                <form className={styles.contactForm}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Your Message" required></textarea>
                  <button type="submit">Send</button>
                </form>
              </section>


      </div>
  );
}