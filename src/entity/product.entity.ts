// product.entity.ts
import {Column, Model, Table, HasMany, PrimaryKey, DataType} from 'sequelize-typescript';
import { Size } from './size.entity';

@Table({
    charset: "utf8"
})
export class Product extends Model<Product> {
    @PrimaryKey
    @Column({
        allowNull: false,
        autoIncrement: true,
    })
    id: number

    @Column({
        type: DataType.BLOB('long'),
    })
    img: Blob

    @Column
    name: string;

    @Column
    createdAt: Date;

    @Column
    wholesalePrice: number;

    @Column
    costPrice: number;

    @Column
    color: string;

    @Column
    memo: string;

    @Column
    category: string;

    @HasMany(() => Size)
    sizes: Size[];
}
