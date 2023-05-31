const { createProxyMiddleware } = require('http-proxy-middleware');
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${process.env.PROXY_PORT}`,
      changeOrigin: true,
    })
  );
};
