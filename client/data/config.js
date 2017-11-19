import Raven from 'raven-js';

const sentry_key = 'ea64d8f3000a4f5aba6d18775dc664dc';
const sentry_app = '231078';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  window && window.console && console.error && console.error(ex);
}
