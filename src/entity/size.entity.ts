// size.entity.ts
import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({
    charset: "utf8"
})
export class Size extends Model<Size> {
    @Column
    size: string;

    @Column
    quantity: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @BelongsTo(() => Product)
    product: Product;
}
