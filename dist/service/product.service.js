"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const product_entity_1 = require("../entity/product.entity");
const size_entity_1 = require("../entity/size.entity");
const sequelize_2 = require("sequelize");
let ProductService = class ProductService {
    constructor(productModel, sizeModel) {
        this.productModel = productModel;
        this.sizeModel = sizeModel;
        this.sizeEnum = ["s", "m", "l", "xl", "xxl", "etc"];
    }
    async createProduct(createProductDto) {
        const isProductConflict = await this.productModel.count({
            where: {
                name: createProductDto.name
            }
        }) > 0;
        if (isProductConflict)
            return "conflict";
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
        const sizes = this.sizeEnum.map(size => new size_entity_1.Size({
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
    async updateProduct(updateProductDto) {
        const product = await this.productModel.findByPk(updateProductDto.id, {
            include: [{
                    model: size_entity_1.Size,
                    as: "sizes"
                }]
        });
        if (!product)
            return "not found";
        const isProductConflict = await this.productModel.count({
            where: {
                name: updateProductDto.name,
                id: {
                    [sequelize_2.Op.ne]: updateProductDto.id
                }
            }
        }) > 0;
        if (isProductConflict)
            return "conflict";
        const sizes = this.sizeEnum.map(size => new size_entity_1.Size({
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
            productInfo.img = updateProductDto.image;
        await product.update(productInfo);
        return "ok";
    }
    async deleteProduct(id) {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.destroy();
    }
    async searchProducts(keyword) {
        return this.productModel.findAll({
            where: {
                name: { [sequelize_2.Op.like]: `%${keyword}%` },
            },
            include: [{
                    model: size_entity_1.Size,
                    as: "sizes"
                }]
        });
    }
    async getAllProducts() {
        return this.productModel.findAll({
            include: [{
                    model: size_entity_1.Size,
                    as: "sizes"
                }]
        });
    }
    async getProductById(id) {
        return this.productModel.findByPk(id, {
            include: [{
                    model: size_entity_1.Size,
                    as: "sizes"
                }]
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_entity_1.Product)),
    __param(1, (0, sequelize_1.InjectModel)(size_entity_1.Size)),
    __metadata("design:paramtypes", [Object, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map