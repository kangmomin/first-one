import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Product} from "../entity/product.entity";
import {CreateProductDto} from "../dto/CreateProductDto";
import {Size} from "../entity/size.entity";
import {Op} from 'sequelize';
import {UpdateProductDto} from "../dto/UpdateProductDto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(Size)
        private sizeModel: typeof Size,
    ) {
    }

    private sizeEnum = ["s", "m", "l", "xl", "xxl", "etc"];

    async createProduct(createProductDto: CreateProductDto): Promise<string> {

        const isProductConflict = await this.productModel.count({
            where: {
                name: createProductDto.name
            }
        }) > 0;

        if (isProductConflict) return "conflict"

        const product = await this.productModel.create({
            color: createProductDto.color,
            createdAt: new Date(),
            name: createProductDto.name,
            img: createProductDto.image,
            costPrice: createProductDto.costPrice,
            memo: createProductDto.memo,
            wholesalePrice: createProductDto.wholesalePrice,
            category: createProductDto.category
        });

        const sizes: Size[] = this.sizeEnum.map(size => new Size({
            size: size.toUpperCase(),
            productId: product.id,
            quantity: createProductDto[size] || 0,
        }));

        for (const se of sizes) {
            await this.sizeModel.create({
                productId: product.id,
                quantity: se.quantity,
                size: se.size
            });
        }

        return "ok";
    }

    async updateProduct(updateProductDto: UpdateProductDto): Promise<string> {
        const product = await this.productModel.findByPk(updateProductDto.id, {
            include: [{
                model: Size,
                as: "sizes"
            }]
        });
        if (!product) return "not found"

        const isProductConflict = await this.productModel.count({
            where: {
                name: updateProductDto.name,
                id: {
                    [Op.ne]: updateProductDto.id
                }
            }
        }) > 0;

        if (isProductConflict) return "conflict"


        const sizes: Size[] = this.sizeEnum.map(size => new Size({
            size: size.toUpperCase(),
            productId: product.id,
            quantity: updateProductDto[size] || 0,
        }));

        for (const se of sizes) {
            const size = await this.sizeModel.findOne({
                where: { productId: product.id, size: se.size.toUpperCase() }
            });

            if (size) {
                await size.update({
                    quantity: se.quantity
                });
            }
        }

        let productInfo = {
            category: updateProductDto.category,
            memo: updateProductDto.memo,
            costPrice: updateProductDto.costPrice,
            name: updateProductDto.name,
            wholesalePrice: updateProductDto.wholesalePrice,
            color: updateProductDto.color,
            img: undefined

        };

        if (updateProductDto.image !== null)
            productInfo.img = updateProductDto.image

        await product.update(productInfo);

        return "ok"
    }

    async deleteProduct(id: number): Promise<void> {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.destroy();
    }

    async searchProducts(keyword: string): Promise<Product[]> {
        return this.productModel.findAll({
            where: {
                name: {[Op.like]: `%${keyword}%`},
            },
            include: [{
                model: Size,
                as: "sizes"
            }]
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.findAll({
            include: [{
                model: Size,
                as: "sizes"
            }]
        });
    }

    async getProductById(id: number) {
        return this.productModel.findByPk(id, {
            include: [{
                model: Size,
                as: "sizes"
            }]
        })
    }
}