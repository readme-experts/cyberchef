'use strict';
const express = require('express');
const router = require('./routes/router');
const authRouter = require('./routes/authRouter');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/api', router);
app.use('/auth', authRouter);

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
