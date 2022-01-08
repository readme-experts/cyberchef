const express = require('express');
const router = require('./routes/router');
const authRouter = require('./routes/authRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/', router);
app.use('/auth', authRouter);

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
