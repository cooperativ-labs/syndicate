import {
  DEFAULT_CUSTOM_DIMENSIONS,
  DEFAULT_IMPRESSION_ACTION,
  EVENT_DEFAULTS
} from '@src/utils/analytics/config';
import TagManager from 'react-gtm-module';
// @ts-expect-error - GTM payload accepts arbitrary keys per dataLayer contract
function track(payload) {
  TagManager.dataLayer({
    dataLayer: { ...payload }
  });
}
// @ts-expect-error - analytics events are built from dynamic payloads
function trackEvent(payload, customDimensions) {
  const analyticsEvent = {
    event: payload.event ?? EVENT_DEFAULTS.event,
    eventCategory: payload.category ?? EVENT_DEFAULTS.category,
    eventAction: payload.action,
    eventLabel: payload.label,
    eventValue: payload.value,
    ...DEFAULT_CUSTOM_DIMENSIONS,
    ...customDimensions
  };
  track(analyticsEvent);
}
// @ts-expect-error - analytics helpers are intentionally untyped for flexibility
export function trackPageView(title, page, rest = {}) {
  track({ title, page, ...DEFAULT_CUSTOM_DIMENSIONS, ...rest, event: 'view' });
}
// @ts-expect-error - analytics helpers are intentionally untyped for flexibility
export function trackInteraction(type, payload, rest) {
  const _defaultRest = {
    eventNonInt: false
  };
  payload.action = payload.action ?? type;
  const customDimensions = { ..._defaultRest, ...rest };
  trackEvent(payload, customDimensions);
}
// @ts-expect-error - analytics helpers are intentionally untyped for flexibility
export function trackImpression(payload, rest) {
  const _defaultRest = {
    eventNonInt: true
  };
  payload.action = payload.action ?? DEFAULT_IMPRESSION_ACTION;
  const customDimensions = { ...rest, ..._defaultRest };
  trackEvent(payload, customDimensions);
}
