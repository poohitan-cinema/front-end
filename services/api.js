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

function trackVideoView({
  userId, videoId, endTime, token,
}) {
  if (!(userId && videoId && endTime && token)) {
    return;
  }

  navigator.sendBeacon(`${apiURL}/video-views?token=${token}`, JSON.stringify({
    userId,
    videoId,
    endTime,
  }));
}

async function getLastView(type, query, { cookies } = {}) {
  return request({
    url: `${apiURL}/video-views/${type}/last`,
    query,
    cookies,
  });
}

async function parseTorrentContent(torrent, { cookies } = {}) {
  const formData = new FormData();

  formData.append('torrent', torrent);

  return request({
    url: `${apiURL}/video-processing/parse-torrent-content`,
    method: 'POST',
    formData: true,
    body: formData,
    cookies,
  });
}

async function getUpdates(query, { cookies } = {}) {
  return request({
    url: `${apiURL}/updates`,
    query,
    cookies,
  });
}

const generateEndpointsFor = modelName => ({
  getMany: (...params) => getMany(modelName, ...params),
  getOne: (...params) => getDetailed(modelName, ...params),
  getRandom: (...params) => getRandom(modelName, ...params),
  update: (...params) => update(modelName, ...params),
});

export default {
  login,

  movies: generateEndpointsFor('movies'),
  serials: generateEndpointsFor('serials'),
  seasons: generateEndpointsFor('seasons'),
  episodes: generateEndpointsFor('episodes'),
  videoViews: {
    ...generateEndpointsFor('video-views'),
    track: trackVideoView,
    getForLastEpisode: (...params) => getLastView('episodes', ...params),
    getForLastMovie: (...params) => getLastView('movies', ...params),
  },

  getUpdates,

  processVideos: {
    parseTorrentContent,
  },
};
