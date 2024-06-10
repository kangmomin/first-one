import { ProductService } from "../service/product.service";
import { Product } from 'src/entity/product.entity';
import { CreateProductDto } from "../dto/CreateProductDto";
import { UpdateProductDto } from "../dto/UpdateProductDto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(): {};
    createProduct(createProductDto: CreateProductDto): Promise<any>;
    updateProduct(id: number): Promise<{
        p: Product;
        size: {};
    }>;
    updateProductProcess(updateProductDto: UpdateProductDto): Promise<any>;
    deleteProduct(id: number): Promise<any>;
    productList(keyword?: string): Promise<{
        products: Product[];
    }>;
}
