import {AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class ProductsDocument extends AbstractDocument{
    @Prop()
    productName: string

    @Prop()
    imageUrl: string

    @Prop()
    inStock: number

    @Prop()
    productDescription: string

}

export const ProductsSchema = SchemaFactory.createForClass(ProductsDocument);