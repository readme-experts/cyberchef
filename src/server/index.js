'use strict';

const fastify = require('fastify')()
const path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../client/html')
});

fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start().then();
