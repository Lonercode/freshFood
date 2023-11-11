import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    productName: string

    @IsString()
    @IsNotEmpty()
    imageUrl: string

    @IsNumber()
    @IsNotEmpty()
    inStock: number

    @IsString()
    @IsNotEmpty()
    ProductDescription: string

}