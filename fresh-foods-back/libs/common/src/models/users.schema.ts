import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "../database/abstract.schema";

@Schema({versionKey: false})
class otpDocument{
    @Prop({default: false})
    requested: boolean

    @Prop()
    reason: string
}

export class UsersDocument extends AbstractDocument{
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({default: false})
    verified: boolean

    @Prop({default: null})
    otp: otpDocument

}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);