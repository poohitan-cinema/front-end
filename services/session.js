import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import decodeJWT from 'jwt-decode';
import API from './api';

let currentUser = {};

function clearCookies() {
  destroyCookie({}, 'cinema-token');
  destroyCookie({}, 'cinema-user');
}

export async function logIn({ name, password }) {
  clearCookies();

  const { user } = await API.login({ name, password });

  currentUser = user;

  Router.push('/');
}

export async function logOut() {
  clearCookies();

  Router.push('/login');
}

export async function getCurrentUser(req) {
  const cookies = parseCookies({ req });
  const token = cookies['cinema-token'];
  const decoded = decodeJWT(token);

  if (currentUser.id !== decoded.id) {
    currentUser = await API.users.getOne(decoded.id, { cookies });
  }

  return currentUser;
}

export function isAuthenticated(req) {
  try {
    const cookies = parseCookies({ req });
    const token = cookies['cinema-token'];
    const decoded = decodeJWT(token);

    return Boolean(decoded.id);
  } catch (error) {
    return false;
  }
}

export default {
  logIn,
  logOut,
  getCurrentUser,
  isAuthenticated,
};
