import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(private readonly productsRepository: ProductsRepository){}
  async getProducts(){
    return this.productsRepository.find({})
  }

  async createProducts(createProductDto: CreateProductDto){
    return this.productsRepository.create({
      ...createProductDto,
      productName: null,
      imageUrl: null,
      inStock: null,
      productDescription: null
    });
  }

  async updateProducts(_product, updateProductsDto: UpdateProductDto){
    return this.productsRepository.findOneAndUpdate(
      {_product},
      {$set:updateProductsDto});
  }

  async deleteProducts(_product){
    return this.productsRepository.findOneAndDelete(_product);
  }

}
