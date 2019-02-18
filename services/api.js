import request from '../utils/request';
import { apiURL } from '../config';



async function getSerials(query = {}) {
  return request({
    url: `${apiURL}/serials`,
    query,
  });
}

async function getSeasons(query = {}) {
  return request({
    url: `${apiURL}/seasons`,
    query,
  });
}

async function getEpisodes(query = {}) {
  return request({
    url: `${apiURL}/episodes`,
    query,
  });
}

async function getMovies(query = {}) {
  return request({
    url: `${apiURL}/movies`,
    query,
  });
}

export default {
  getSerials,
  getSeasons,
  getEpisodes,
  getMovies,
};
