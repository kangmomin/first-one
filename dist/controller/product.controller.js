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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../service/product.service");
const CreateProductDto_1 = require("../dto/CreateProductDto");
const UpdateProductDto_1 = require("../dto/UpdateProductDto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    addProduct() {
        return {};
    }
    async createProduct(createProductDto) {
        let s = await this.productService.createProduct(createProductDto);
        return {
            status: s !== "ok" ? "success" : "conflict"
        };
    }
    async updateProduct(id) {
        const p = await this.productService.getProductById(id);
        const sizeObj = {};
        p.sizes.forEach(val => {
            sizeObj[val.size] = val.quantity;
        });
        return {
            p,
            size: sizeObj
        };
    }
    async updateProductProcess(updateProductDto) {
        let s = await this.productService.updateProduct(updateProductDto);
        return {
            status: s !== "ok" ? s : "success"
        };
    }
    async deleteProduct(id) {
        await this.productService.deleteProduct(id);
        return;
    }
    async productList(keyword) {
        let products;
        if (keyword) {
            products = await this.productService.searchProducts(keyword);
        }
        else {
            products = await this.productService.getAllProducts();
        }
        return { products };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('add'),
    (0, common_1.Render)('product/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductDto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('update/:id'),
    (0, common_1.Render)('product/update'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProductDto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductProcess", null);
__decorate([
    (0, common_1.Get)('/delete/:id'),
    (0, common_1.Redirect)("/product/list"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.Render)('product/list'),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productList", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map