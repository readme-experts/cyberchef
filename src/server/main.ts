import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

const start = async () => {
  try {
    const PORT = Process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
