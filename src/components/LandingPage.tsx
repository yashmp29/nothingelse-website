import { useEffect, useState } from 'react';
import styles from '@/styles/landing.module.css';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.landingContainer}>
      {/* Background Animation */}
      <div className={styles.backgroundAnimation}>
        <div className={`${styles.animatedCircle} ${styles.circle1}`}></div>
        <div className={`${styles.animatedCircle} ${styles.circle2}`}></div>
        <div className={`${styles.animatedCircle} ${styles.circle3}`}></div>
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.logo}>
          <span>NOTHING</span>
          <span>ELSE</span>
        </div>
        <div className={styles.tagline}>
          Exploring the boundaries of knowledge, culture, and existence
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}></div>
        </div>
        <div className={styles.loadingMessage}>
          Loading insights and perspectives
        </div>
        <div className={styles.scrollHint}>
          <div className={styles.scrollText}>Scroll to explore</div>
          <div className={styles.scrollIcon}></div>
        </div>
      </div>
    </div>
  );
}
