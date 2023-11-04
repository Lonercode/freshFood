import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersDocument, UsersSchema } from "@app/common/models/users.schema";
import { DatabaseModule } from "@app/common";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([{name: UsersDocument.name, schema: UsersSchema}]),
    ],

    exports: [UsersService, UsersRepository],

    controllers: [UsersController],

    providers: [UsersService, UsersRepository],
})

export class UsersModel{};