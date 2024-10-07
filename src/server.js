const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = 9000;
const host = 'localhost';

const init = async () => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server started at ${server.info.host}`);
};

init();
