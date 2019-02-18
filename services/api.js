import request from '../utils/request';
import { apiURL } from '../config';

async function login({ password }) {
  return request({
    url: `${apiURL}/login`,
    method: 'POST',
    body: {
      password,
    },
  });
}

async function getResource(endpoint, query, { cookies }) {
  return request({
    url: `${apiURL}/${endpoint}`,
    query,
    cookies,
  });
}

const getSerials = (...params) => getResource('serials', ...params);
const getEpisodes = (...params) => getResource('episodes', ...params);
const getSeasons = (...params) => getResource('seasons', ...params);
const getMovies = (...params) => getResource('movies', ...params);

export default {
  login,
  getSerials,
  getSeasons,
  getEpisodes,
  getMovies,
};
