import { AbstractRepository } from "@app/common";
import { Orders } from "./models/orders.schema";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common'
import { Model, Connection } from "mongoose";

export class OrdersRepository extends AbstractRepository<Orders>{
    protected readonly logger = new Logger(OrdersRepository.name)

    constructor(
        @InjectModel(Orders.name) ordersModel: Model<Orders>,
        @InjectConnection() connection: Connection
    )
    {
        super(ordersModel, connection)
    }
}