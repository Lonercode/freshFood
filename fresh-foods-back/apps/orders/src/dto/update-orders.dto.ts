import { PartialType } from '@nestjs/mapped-types';
import { createOrdersDto } from './create-orders';

export class updateOrdersDTO extends PartialType( createOrdersDto) {}