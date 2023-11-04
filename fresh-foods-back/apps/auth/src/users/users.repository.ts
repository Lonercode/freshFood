import { AbstractRepository } from "@app/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from '@nestjs/common';
import { Model, Connection } from "mongoose";
import { UsersDocument } from "@app/common/models/users.schema";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument>{
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(@InjectModel(UsersDocument.name) usersModel: Model<UsersDocument>,
                @InjectConnection() connection: Connection){

        super(usersModel, connection)
    }
}