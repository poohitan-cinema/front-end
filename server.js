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

    server.get('/serials/:serial_id/:season_id', (req, res) => {
      app.render(req, res, '/season', {
        serialId: req.params.serial_id,
        id: req.params.season_id,
      });
    });

    server.get('/serials/:serial_id', (req, res) => {
      app.render(req, res, '/serial', {
        id: req.params.serial_id,
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
