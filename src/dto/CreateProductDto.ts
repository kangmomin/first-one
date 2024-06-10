export class CreateProductDto {
    name: string;
    color: string;
    costPrice: number;
    wholesalePrice: number;
    S: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
    etc: string;
    memo: string;
    category: string;
    image: Blob | null;
}