import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();

const USER_KEY = 'user';
const TOKEN_KEY = 'accessToken';
const LOGIN_CLICKED_KEY = 'loginClicked';

export const setUser = (user: UserCredential['user'], token?: string) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const setLoginClickedStatus = (status: string) =>
  localStorage.setItem(LOGIN_CLICKED_KEY, status);
export const getLoginClickedStatus = () =>
  localStorage.getItem(LOGIN_CLICKED_KEY);

export const login = async () => {
  try {
    return await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const onLoginResult = async () => {
  try {
    const result = await getRedirectResult(auth);

    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result?.user;
      setUser(user, token);
      return token;
    }

    return null;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.log('firebaseError', firebaseError);

    const credential = GoogleAuthProvider.credentialFromError(firebaseError);
    console.log('error credential', credential);
    return null;
  }
};
