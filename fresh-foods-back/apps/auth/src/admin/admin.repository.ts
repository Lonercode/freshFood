import { Injectable, Logger } from "@nestjs/common";
import { Admin } from "./schema/admin.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { AbstractRepository } from "@app/common";

@Injectable()
export class AdminRepository extends AbstractRepository<Admin>{
    readonly logger = new Logger(AdminRepository.name);

    constructor(
        @InjectModel(Admin.name) adminModel: Model<Admin>,
        @InjectConnection() connection: Connection
    ){
        super(adminModel, connection)
    }
}