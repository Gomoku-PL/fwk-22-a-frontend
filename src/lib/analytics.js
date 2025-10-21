import { getCookiePreferences } from './api.js';

export function canUseAnalytics() {
  const prefs = getCookiePreferences();
  return prefs?.analytics === true;
}

export function canUseMarketing() {
  const prefs = getCookiePreferences();
  return prefs?.marketing === true;
}

export function trackEvent(eventName, eventData = {}) {
  if (!canUseAnalytics()) {
    return;
  }

  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }

  if (typeof analytics !== 'undefined') {
    analytics.track(eventName, eventData);
  }

  console.log('Analytics event:', eventName, eventData);
}

export function trackPageView(page) {
  if (!canUseAnalytics()) {
    return;
  }

  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: page,
      page_location: window.location.href
    });
  }

  console.log('Page view tracked:', page);
}

export function initializeAnalytics() {
  if (!canUseAnalytics()) {
    console.log('Analytics disabled by user preferences');
    return;
  }

  console.log('Analytics initialized');
}