// product.controller.ts
import {Controller, Get, Post, Body, Param, Put, Delete, Render, Query, Redirect} from '@nestjs/common';
import {ProductService} from "../service/product.service";
import { Product } from 'src/entity/product.entity';
import {CreateProductDto} from "../dto/CreateProductDto";
import {UpdateProductDto} from "../dto/UpdateProductDto";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get('add')
    @Render('product/add')
    addProduct() {
        return {};
    }

    @Post('add')
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
        let s = await this.productService.createProduct(createProductDto);

        return {
            status: s !== "ok" ? "success" : "conflict"
        };
    }

    @Get('update/:id')
    @Render('product/update')
    async updateProduct(
        @Param('id') id: number
    ) {
        const p = await this.productService.getProductById(id)

        const sizeObj = {}

        p.sizes.forEach(val => {
            sizeObj[val.size] = val.quantity
        })

        return {
            p,
            size: sizeObj
        };
    }

    @Put('/update')
    async updateProductProcess(@Body() updateProductDto: UpdateProductDto): Promise<any> {
        let s = await this.productService.updateProduct(updateProductDto);

        return {
            status: s !== "ok" ?  s : "success"
        };
    }

    @Get('/delete/:id')
    @Redirect("/product/list")
    async deleteProduct(@Param('id') id: number): Promise<any> {
        await this.productService.deleteProduct(id);

        return
    }

    @Get('list')
    @Render('product/list')
    async productList(@Query('keyword') keyword?: string) {
        let products: Product[];
        if (keyword) {
            products = await this.productService.searchProducts(keyword);
        } else {
            products = await this.productService.getAllProducts();
        }

        return { products };
    }
}