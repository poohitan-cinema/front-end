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

async function getMany(endpoint, query, { cookies }) {
  return request({
    url: `${apiURL}/${endpoint}`,
    query,
    cookies,
  });
}

async function getDetailed(endpoint, query, { cookies }) {
  return request({
    url: `${apiURL}/${endpoint}/detailed`,
    query,
    cookies,
  });
}

const getSerials = (...params) => getMany('serials', ...params);
const getEpisodes = (...params) => getMany('episodes', ...params);
const getSeasons = (...params) => getMany('seasons', ...params);
const getMovies = (...params) => getMany('movies', ...params);

const getSerial = (...params) => getDetailed('serials', ...params);
const getSeason = (...params) => getDetailed('seasons', ...params);
const getEpisode = (...params) => getDetailed('episodes', ...params);

export default {
  login,
  getSerials,
  getSerial,
  getSeasons,
  getSeason,
  getEpisodes,
  getEpisode,
  getMovies,
};
