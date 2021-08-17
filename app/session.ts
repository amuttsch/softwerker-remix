import { createCookieSessionStorage } from 'remix';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__session',

    // all of these are optional
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secrets: ['SuperSecretSecret'],
    secure: true,
  },
});

export { getSession, commitSession, destroySession };
