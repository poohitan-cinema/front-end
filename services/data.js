const data = [
  {
    id: 'the-simpsons',
    title: 'Сімпсони',
    icon: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/donut.png',
    cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/the-simpsons.jpg',
    type: 'serial',
    seasons: [
      {
        id: 1,
        cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/s01e01_56.jpg',
        episodes: [
          {
            id: 1,
            title: 'Simpsons Roasting on an Open Fire',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 2,
            title: 'Bart the Genius',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 3,
            title: 'Homer\'s Odyssey',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 4,
            title: 'There\'s No Disgrace Like Home',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 5,
            title: 'Bart the General',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 6,
            title: 'Moaning Lisa',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
          {
            id: 7,
            title: 'The Call of the Simpsons',
            source: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/videos/serials/the-simpsons/kurhan-liubopytstvo.mp4',
          },
        ],
      },
      {
        id: 2,
        cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/s02e01_47.jpg',
        episodes: [
          {

          },
        ],
      },
      {
        id: 3,
        cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/s01e01_56.jpg',
        episodes: [
          {

          },
        ],
      },
      {
        id: 4,
        cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/the-simpsons/s02e01_47.jpg',
        episodes: [
          {

          },
        ],
      },
    ],
  },
  {
    id: 'rick-and-morty',
    title: 'Рік та Морті',
    icon: '',
    cover: 'https://poohitan-com.ams3.cdn.digitaloceanspaces.com/cinema/images/serials/rick-and-morty/rick-and-morty.jpg',
    type: 'serial',
    seasons: [
      {
        id: 1,
        episodes: [
          {

          },
        ],
      },
      {
        id: 2,
        episodes: [
          {

          },
        ],
      },
      {
        id: 3,
        episodes: [
          {

          },
        ],
      },
      {
        id: 4,
        episodes: [
          {

          },
        ],
      },
    ],
  },
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

export default {
  listSerials,
  listMovies,
  getSerial,
  getMovie,
  getSeason,
  getEpisode,
};
