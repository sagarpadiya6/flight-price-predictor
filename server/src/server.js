import dotenv from 'dotenv';
dotenv.config();

import debugLib from 'debug';
import server, { app } from './app';
import { sequelize } from './models';

const debug = debugLib('flight-price:server');

const port = process.env.PORT || '4000';
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(app.get('port'), async () => {
  console.log(`Server started on port: ${server.address().port}`);
  try {
    // console.log('sequelize::', sequelize);
    // await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
server.on('error', onError);
server.on('listening', onListening);
