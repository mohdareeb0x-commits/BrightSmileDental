'use client';

import { Variant } from './variants';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
    };
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function initGTM() {
  if (typeof window === 'undefined' || !GTM_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GTM_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}

export function initMetaPixel() {
  if (typeof window === 'undefined' || !META_PIXEL_ID) return;

  window.fbq = window.fbq || function (...args: unknown[]) {
    if (window.fbq.callMethod) {
      window.fbq.callMethod(...args);
    } else {
      window.fbq.queue.push(args);
    }
  };
  window.fbq.queue = window.fbq.queue || [];
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);
}

type EventParams = Record<string, string | number | boolean>;

function withVariant(params: EventParams, variant: Variant): EventParams {
  return { ...params, ab_variant: variant };
}

export function trackEvent(eventName: string, params: EventParams = {}, variant: Variant) {
  if (typeof window === 'undefined') return;

  const enrichedParams = withVariant(params, variant);

  if (window.gtag) {
    window.gtag('event', eventName, enrichedParams);
  }

  if (window.fbq) {
    if (eventName === 'lead') {
      window.fbq('track', 'Lead', enrichedParams);
    } else {
      window.fbq('trackCustom', eventName, enrichedParams);
    }
  }
}

export function trackCTAClick(location: string, variant: Variant) {
  trackEvent('cta_click', { location }, variant);
}

export function trackFormSubmit(variant: Variant) {
  trackEvent('form_submit', { form_type: 'free_consultation' }, variant);
}

export function trackScrollDepth(percent: number, variant: Variant) {
  trackEvent('scroll_depth', { percent }, variant);
}

export function trackPageView(variant: Variant) {
  trackEvent('page_view', { page_path: window.location.pathname }, variant);
}