import { AbstractRepository } from "@app/common";
import { ProductsDocument } from "./src/schemas/products.schema";
import { Logger } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

export class ProductsRepository extends AbstractRepository<ProductsDocument>{
    protected readonly logger = new Logger(ProductsRepository.name);

    constructor(@InjectModel(ProductsDocument.name) productsModel: Model<ProductsDocument>,
    @InjectConnection() connection: Connection)
    {
        super(productsModel, connection);
    }
}