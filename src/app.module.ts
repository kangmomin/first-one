import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import {ProductModule} from "./module/product.module";
import * as process from "process";
import {AuthMiddleware} from "./auth.middleware";
import {AuthController} from "./controller/auth.controller";
import {ProductController} from "./controller/product.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductModule,
  ],
  controllers: [AuthController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
        .exclude(
            { path: 'auth', method: RequestMethod.ALL } // 'auth' 경로 제외
        ).forRoutes('*');
  }
}