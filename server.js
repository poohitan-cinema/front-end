const express = require('express');
const next = require('next');

const config = require('./config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    const { port } = config;

    server.get('/serials/:serial_slug/seasons/:season_number/episodes/:episode_number', (req, res) => {
      app.render(req, res, '/episode', {
        serialSlug: req.params.serial_slug,
        seasonNumber: req.params.season_number,
        number: req.params.episode_number,
      });
    });

    server.get('/serials/:serial_slug/seasons/:season_number', (req, res) => {
      app.render(req, res, '/season', {
        serialSlug: req.params.serial_slug,
        number: req.params.season_number,
      });
    });

    server.get('/serials/:serial_slug', (req, res) => {
      app.render(req, res, '/serial', {
        slug: req.params.serial_slug,
      });
    });

    server.get('/movies/:movie_slug', (req, res) => {
      app.render(req, res, '/movie', {
        slug: req.params.movie_slug,
      });
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (error) => {
      if (error) {
        throw error;
      }

      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
