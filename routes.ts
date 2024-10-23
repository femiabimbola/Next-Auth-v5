/**
 * An array  of routes accessible to the publuc.
 * These routes do not require authentication
 * @type{string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array  of routes accessible to the publuc.
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset"];

/**
 * The prefix for API authentication.
 * Routes that start with this prefix are used for API authentication
 * @type{string}
 */
// export const apiAuthPrefix = "/api/auth";
export const apiAuthPrefix = "/api/";

/**
 * The default redirect part after logging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
