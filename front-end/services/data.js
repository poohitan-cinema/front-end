const theSimpsons = require('../data/serials/the-simpsons');
const rickAndMorty = require('../data/serials/rick-and-morty');

const data = [
  theSimpsons,
  rickAndMorty,
];

function listSerials() {
  return data
    .filter(item => item.type === 'serial')
    .map((item) => {
      const { seasons, ...restSerial } = item;

      return restSerial;
    });
}

function listMovies() {
  return data
    .filter(item => item.type === 'movie');
}

function getSerial({ id }) {
  const serial = data.find(item => item.id === id && item.type === 'serial');
  const { seasons, ...restSerial } = serial;

  return {
    ...restSerial,
    seasons: seasons.map((season) => {
      const { episodes, ...restSeason } = season;

      return restSeason;
    }),
  };
}

function getMovie({ id }) {
  return data.find(item => item.id === id && item.type === 'movie');
}

function getSeason({ id, serialId }) {
  const serial = data
    .find(item => item.id === serialId && item.type === 'serial');

  const season = serial.seasons.find(item => item.id === Number(id));

  return { ...season, serial: getSerial({ id: serialId }) };
}

function getEpisode({ id, serialId, seasonId }) {
  const season = getSeason({ id: seasonId, serialId });
  const episode = season.episodes.find(item => item.id === Number(id));

  return {
    ...episode,
    season,
    serial: getSerial({ id: serialId }),
  };
}

module.exports = {
  data,
  listSerials,
  listMovies,
  getSerial,
  getMovie,
  getSeason,
  getEpisode,
};
