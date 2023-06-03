import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as Process from 'process';
import * as dotenv from 'dotenv';
import * as fastifySession from '@fastify/session';
import * as fastifyCookie from '@fastify/cookie';
import * as passport from 'passport';

dotenv.config();

const start = async () => {
  try {
    const PORT = Process.env.PORT || 5001;
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    await app.register(fastifyCookie);
    await app.register(fastifySession, {
      secret: `somesecret`,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 3400000,
      },
    });
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
