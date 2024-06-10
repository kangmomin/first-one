import { Product } from "../entity/product.entity";
import { CreateProductDto } from "../dto/CreateProductDto";
import { Size } from "../entity/size.entity";
import { UpdateProductDto } from "../dto/UpdateProductDto";
export declare class ProductService {
    private productModel;
    private sizeModel;
    constructor(productModel: typeof Product, sizeModel: typeof Size);
    private sizeEnum;
    createProduct(createProductDto: CreateProductDto): Promise<string>;
    updateProduct(updateProductDto: UpdateProductDto): Promise<string>;
    deleteProduct(id: number): Promise<void>;
    searchProducts(keyword: string): Promise<Product[]>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
}
