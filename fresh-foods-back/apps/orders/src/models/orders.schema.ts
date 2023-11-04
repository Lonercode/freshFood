import { AbstractDocument } from '@app/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({versionKey: false})
class LocationDocument{
    @Prop()
    lonitude: number

    @Prop()
    latitude: number

    @Prop()
    address: string
}

export enum Status{
    PENDING = "pending",
    INITIATED = "initiated",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    COMPLETED = "completed"
}


@Schema({versionKey: false})
export class Orders extends AbstractDocument{
    @Prop()
    timestamp: Date

    @Prop()
    location: LocationDocument

    @Prop()
    requestedBy: string

    @Prop()
    assignedTo: string

    @Prop({enum: Status, default: Status.PENDING})
    status: Status

    @Prop()
    notes: string

    @Prop()
    completedAt: Date

    @Prop()
    invoiceId: string

    @Prop()
    quantity: number 

    @Prop()
    price: number
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)