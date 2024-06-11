import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import {json} from "express";
import * as hbs from 'hbs';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.use(
      session({
        secret: 'your-secret-key', // 비밀 키 설정
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 86400000 } // 1일 (24시간)
      }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine("hbs")
  app.use(json({ limit: '50mb' }));

  hbs.registerHelper("multiple", (index,value) => {
    return (value / (index * 200)).toFixed(1).toLocaleString();
  })
  hbs.registerHelper("locale", (index) => {
    return index.toLocaleString();
  })
  hbs.registerHelper("len", (index) => {
    let sum = 0

    index.forEach(val => {
      sum += val.quantity
    })

    return sum
  })

  await app.listen(process.env.PORT);
}
bootstrap();
