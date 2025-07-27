// Google Analytics configuration and event tracking
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for 1OgniGiorno
export const trackButtonClick = (buttonName: string, location: string) => {
  event('click', 'button', `${buttonName} - ${location}`);
};

export const trackModalOpen = (modalType: string) => {
  event('open', 'modal', modalType);
};

export const trackModalClose = (modalType: string) => {
  event('close', 'modal', modalType);
};

export const trackFormSubmission = (formType: string, success: boolean) => {
  event(success ? 'submit_success' : 'submit_error', 'form', formType);
};

export const trackSocialShare = (platform: string) => {
  event('share', 'social', platform);
};

export const trackPageSection = (section: string) => {
  event('view', 'section', section);
};

export const trackSubscription = (method: 'email' | 'phone' | 'both') => {
  event('subscribe', 'conversion', method);
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
} 