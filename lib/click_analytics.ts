// utils/discordAnalytics.ts

interface AnalyticsEvent {
  eventType: 'button_click' | 'certification_verify' | 'certification_view' | 'custom';
  buttonName?: string;
  certificationTitle?: string;
  certificationIssuer?: string;
  page?: string;
  timestamp?: string;
  userAgent?: string;
  referrer?: string;
}

export async function trackButtonClick(event: AnalyticsEvent): Promise<void> {
  try {
    // Get user info
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || 'Direct';
    const currentPage = window.location.pathname;
    const timestamp = new Date().toISOString();

    // Send to your API route instead of directly to Discord
    const response = await fetch('/api/click-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        userAgent,
        referrer,
        currentPage,
        timestamp
      })
    });

    if (!response.ok) {
      console.error('Failed to send analytics:', response.statusText);
    }
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
}

// Helper functions for common tracking scenarios
export const trackCertificationVerify = (title: string, issuer: string) => {
  trackButtonClick({
    eventType: 'certification_verify',
    certificationTitle: title,
    certificationIssuer: issuer
  });
};

export const trackCertificationView = (title: string, issuer: string) => {
  trackButtonClick({
    eventType: 'certification_view',
    certificationTitle: title,
    certificationIssuer: issuer
  });
};

export const trackCustomButton = (buttonName: string, page?: string) => {
  trackButtonClick({
    eventType: 'button_click',
    buttonName: buttonName,
    page: page
  });
};