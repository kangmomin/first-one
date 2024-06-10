import { Model } from 'sequelize-typescript';
import { Size } from './size.entity';
export declare class Product extends Model<Product> {
    id: number;
    img: Blob;
    name: string;
    createdAt: Date;
    wholesalePrice: number;
    costPrice: number;
    color: string;
    memo: string;
    category: string;
    sizes: Size[];
}
