'use client'
import { useState } from 'react';
import Terminal from './component/Terminal';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleTerminalComplete = () => {
    setIsLoading(false);
  };

  return (
      <div>
        {isLoading ? (
            <Terminal onComplete={handleTerminalComplete} />
        ) : (
            <main style={{ padding: '20px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                Welcome to Sabir&apos;s Portfolio
              </h1>
              <p style={{ fontSize: '1.2rem' }}>
                This is the real portfolio page! I&apos;m a Software Engineer building cool stuff.
              </p>
              {/* Add more sections like projects, skills, etc. later */}
            </main>
        )}
      </div>
  );
}