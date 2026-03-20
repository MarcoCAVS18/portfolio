import { logEvent } from 'firebase/analytics'
import { analyticsPromise } from './firebaseConfig'

export async function trackEvent(eventName, params = {}) {
  const analytics = await analyticsPromise
  if (analytics) {
    logEvent(analytics, eventName, params)
  }
}
