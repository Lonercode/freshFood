import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ProductsDocument } from 'apps/products/src/schemas/products.schema';

const getCurrentProductbyContext = (context: ExecutionContext): ProductsDocument =>{
    return context.switchToHttp().getRequest().product;
}
export const CurrentProduct = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentProductbyContext(context)
)