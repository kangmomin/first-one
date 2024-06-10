// product.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {Product} from "../entity/product.entity";
import {ProductController} from "../controller/product.controller";
import {ProductService} from "../service/product.service";
import {Size} from "../entity/size.entity";

@Module({
    imports: [SequelizeModule.forFeature([Product, Size])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
