export const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost';
export const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';
export const API_ROUTE = API_HOST + '/api/' + API_VERSION;

// paths
export const GET_CSRF_TOKEN_PATH =
  process.env.REACT_APP_GET_CSRF_TOKEN_PATH || '/sanctum/csrf-cookie';

export const SIGNUP_PATH = process.env.REACT_APP_SIGNUP_PATH || '/register';

export const VERIFICATION_NOTIFICATION_PATH =
  process.env.REACT_APP_VERIFICATION_NOTIFICATION_PATH ||
  '/email/verification-notification';

export const SIGNIN_PATH = process.env.REACT_APP_SIGNIN_PATH || '/login';

export const UPDATE_USER_INFO_PATH =
  process.env.REACT_APP_UPDATE_USER_INFO_PATH || '/user/profile-information2';

export const UPDATE_PASSWORD_PATH =
  process.env.REACT_APP_UPDATE_PASSWORD_PATH || '/user/password';

export const SIGNOUT_PATH = process.env.REACT_APP_SIGNOUT_PATH || '/logout';

export const FORGOT_PASSWORD_PATH =
  process.env.REACT_APP_FORGOT_PASSWORD_PATH || '/forgot-password';

export const RESET_PASSWORD_PATH =
  process.env.REACT_APP_RESET_PASSWORD_PATH || '/reset-password';

export const AUTH_USER_PATH =
  process.env.REACT_APP_AUTH_USER_PATH || '/users/auth';

export const paths = {
  GET_CSRF_TOKEN_PATH,
  SIGNUP_PATH,
  VERIFICATION_NOTIFICATION_PATH,
  SIGNIN_PATH,
  UPDATE_USER_INFO_PATH,
  UPDATE_PASSWORD_PATH,
  SIGNOUT_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  AUTH_USER_PATH,
} as const;
