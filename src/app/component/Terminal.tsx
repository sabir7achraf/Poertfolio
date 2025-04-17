'use client'
import { useEffect, useState } from 'react';

import styles from './Terminal.module.css';

interface TerminalProps {
    onComplete: () => void;
}

const Terminal = ({ onComplete }: TerminalProps) => {
    const [displayText, setDisplayText] = useState('');
    const fullText = [
        'sabir@portfolio:~$ whoami',
        'Name: Sabir Achraf',
        'Age: 22',
        'Role: Software Engineer',
        'sabir@portfolio:~$ Loading portfolio...',
    ];

    useEffect(() => {
        let currentLine = 0;
        let currentChar = 0;

        const typeText = () => {
            if (currentLine < fullText.length) {
                const line = fullText[currentLine];
                if (currentChar <= line.length) {
                    setDisplayText((prev) =>
                        prev.substring(0, prev.lastIndexOf('\n') + 1) + line.substring(0, currentChar)
                    );
                    currentChar++;
                    setTimeout(typeText, 50);
                } else {
                    setDisplayText((prev) => prev + '\n');
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeText, 300);
                }
            } else {
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
        };

        typeText();
    }, [onComplete]);

    return (
        <div className={styles.terminal}>
            <div className={styles.titlebar}>
                <span className={styles.iconMinimize}></span>
                <span className={styles.iconMaximize}></span>
                <span className={styles.iconClose}></span>
            </div>
            <pre className={styles.terminalContent}>{displayText}</pre>
        </div>
    );
};

export default Terminal;