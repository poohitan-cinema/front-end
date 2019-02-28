import request from '../utils/request';
import { apiURL } from '../config';

async function login({ name, password }) {
  return request({
    url: `${apiURL}/login`,
    method: 'POST',
    body: {
      name,
      password,
    },
  });
}

async function update(tableName, id, body, { cookies } = {}) {
  return request({
    url: `${apiURL}/${tableName}/${id}`,
    method: 'PATCH',
    body,
    cookies,
  });
}

async function getMany(tableName, query, { cookies } = {}) {
  return request({
    url: `${apiURL}/${tableName}`,
    query,
    cookies,
  });
}

async function getDetailed(tableName, query, { cookies } = {}) {
  return request({
    url: `${apiURL}/${tableName}/detailed`,
    query,
    cookies,
  });
}

async function getRandom(tableName, query, { cookies } = {}) {
  return request({
    url: `${apiURL}/${tableName}/random`,
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

const getRandomEpisode = (...params) => getRandom('episodes', ...params);
const getRandomMovie = (...params) => getRandom('movies', ...params);

const updateEpisode = (...params) => update('episodes', ...params);

export default {
  login,

  getSerials,
  getSerial,

  getSeasons,
  getSeason,

  getEpisodes,
  getEpisode,
  getRandomEpisode,
  updateEpisode,

  getMovies,
  getRandomMovie,
};
