/* eslint-disable  @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = function(app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${process.env.PROXY_PORT}`,
      changeOrigin: true,
    })
  );
};
