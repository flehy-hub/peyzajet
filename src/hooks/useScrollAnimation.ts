import { useEffect, useRef, useState, useCallback } from 'react';
import { Platform } from 'react-native';

export function useScrollAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  const handleScroll = useCallback(() => {
    if (!ref.current || isVisible) return;
    if (Platform.OS === 'web' && ref.current?.getBoundingClientRect) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * (1 - threshold)) {
        setIsVisible(true);
      }
    }
  }, [isVisible, threshold]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setIsVisible(true);
      return;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ref, isVisible };
}
