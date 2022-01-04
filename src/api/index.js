const express = require('express');
const router = require('./router')
const authRouter = require('./authRouter')
// const cors = require('cors')
const cookieParser = require('cookie-parser')


require('dotenv').config()

const app = express();
const PORT = process.env.PORT 

app.use(express.json());
app.use(cookieParser())
// app.use(cors())
app.use('/', router);
app.use('/auth',authRouter);

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
