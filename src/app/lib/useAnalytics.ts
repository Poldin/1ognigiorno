"use client";

import { useEffect, useRef } from 'react';
import { trackPageSection, event } from './gtag';

// Hook per tracciare lo scroll depth
export const useScrollTracking = () => {
  const maxScrollRef = useRef(0);
  const trackedMilestonesRef = useRef(new Set<number>());

  useEffect(() => {
    const timeOnPage = Date.now();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Aggiorna il massimo scroll raggiunto
      if (scrollPercentage > maxScrollRef.current) {
        maxScrollRef.current = scrollPercentage;
      }

      // Traccia milestone specifiche (25%, 50%, 75%, 90%)
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedMilestonesRef.current.has(milestone)) {
          trackedMilestonesRef.current.add(milestone);
          event('scroll', 'engagement', `${milestone}%`, milestone);
        }
      });
    };

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - timeOnPage) / 1000);
      event('time_on_page', 'engagement', 'seconds', timeSpent);
      event('max_scroll', 'engagement', 'percentage', maxScrollRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

// Hook per tracciare quando le sezioni entrano nel viewport
export const useSectionTracking = (sectionName: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasBeenViewedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenViewedRef.current) {
            trackPageSection(sectionName);
            hasBeenViewedRef.current = true;
            observer.disconnect(); // Stop observing once tracked
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -10% 0px' // Slight offset
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionName]);

  return sectionRef;
};

// Hook per tracciare il tempo speso su una pagina specifica
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();
    
    // Track page view
    event('page_view', 'navigation', pageName);

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      event('page_exit', 'navigation', pageName, timeSpent);
    };
  }, [pageName]);
}; 