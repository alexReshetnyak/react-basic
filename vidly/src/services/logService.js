import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://740d2a36f4434e868ce741a40f6def4a@sentry.io/1294631"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
