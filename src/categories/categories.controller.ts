import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getCategories() {
        return this.categoriesService.findAll();
    }

    //data category bedasrkan id
    @Get(':id')
    getCategoryById(@Param('id') id: string) {
        return this.categoriesService.findById(id);
    }

    //menambahkan data category baru
    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    // mengubah data category berdasarkan id
    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    //menghapus data category berdasarkan id
    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}