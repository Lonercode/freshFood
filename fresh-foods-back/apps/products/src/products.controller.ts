import { Controller, Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsDocument } from './schemas/products.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentProduct } from '@app/common/decorators/current-product.decorator';
import { AdminJwtGuard } from 'apps/auth/src/guards/admin-jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(){
    return this.productsService.getProducts();
  }

  @UseGuards(AdminJwtGuard)
  @Post()
  async createProducts(createProductDto: CreateProductDto){
    return this.productsService.createProducts(createProductDto);
  }

  @UseGuards(AdminJwtGuard)
  @Patch()
  async updateProducts(@CurrentProduct() product: ProductsDocument, updateProductsDto: UpdateProductDto){
    return this.productsService.updateProducts(product, updateProductsDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete()
  async deleteProducts(@CurrentProduct() product: ProductsDocument){
    return this.productsService.deleteProducts(product);
  }
  
}
