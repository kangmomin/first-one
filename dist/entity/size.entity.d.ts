import { Model } from 'sequelize-typescript';
import { Product } from './product.entity';
export declare class Size extends Model<Size> {
    size: string;
    quantity: number;
    productId: number;
    product: Product;
}
