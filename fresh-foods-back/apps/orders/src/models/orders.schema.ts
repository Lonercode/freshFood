import { AbstractDocument } from '@app/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({versionKey: false})
export class Orders extends AbstractDocument{
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    quantity: number

    @Prop()
    phoneNumber: string

}

export const OrdersSchema = SchemaFactory.createForClass(Orders)