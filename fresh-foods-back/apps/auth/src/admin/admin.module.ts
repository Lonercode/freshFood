import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi';
import { DatabaseModule } from "@app/common";
import { Admin, AdminSchema } from "./schema/admin.schema";
import { AdminRepository } from "./admin.repository";
import { AdminService } from "./admin.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                ADMIN_PORT: Joi.number().required()
            })
        }),
        DatabaseModule,
        DatabaseModule.forFeature([{name: Admin.name, schema: AdminSchema}])
    ],

    providers: [AdminService, AdminRepository],

    controllers: [AdminController]
})

export class AdminModule{}