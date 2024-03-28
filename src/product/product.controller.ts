import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/is-public.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProductDto } from './dto/product.dto';
import { ProductDetailsDto } from './dto/product-details.dto';
import { ReturnAllProducts } from './dto/return-all-products.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Serialize(ProductDto)
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, image);
  }

  @Public()
  @Get()
  @Serialize(ReturnAllProducts)
  findAll(
    @Query('search') search: string,
    @Query('category') categoryId: string,
    @Query('size') size?: string,
    @Query('page') page?: string,
  ) {
    return this.productService.findAll(search, categoryId, +size, +page);
  }

  @Public()
  @Serialize(ProductDetailsDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @Serialize(ProductDto)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @Serialize(ProductDto)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
