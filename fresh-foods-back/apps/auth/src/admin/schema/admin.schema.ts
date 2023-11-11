import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
class otpDocument{
    @Prop({default: false})
    requested: boolean

    @Prop()
    reason: string
}

export class Admin extends AbstractDocument{
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({default: false})
    verified: boolean

    @Prop({default: null})
    otp: otpDocument

}

export const AdminSchema = SchemaFactory.createForClass(Admin);