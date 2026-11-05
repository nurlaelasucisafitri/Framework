import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new NotFoundException(`Kategori ${id} tidak ditemukan`);
        }

        return category;
    }

    async create(dto: CreateCategoryDto): Promise<Category> {
        await this.checkNameUnique(dto.name);

        const newCategory = this.categoryRepository.create(dto);

        return await this.categoryRepository.save(newCategory);
    }

    //mengubah data category berdasarkan id
    async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id);

        if (dto.name && dto.name !== category.name) {
            await this.checkNameUnique(dto.name);
        }

        const updatedCategory = this.categoryRepository.merge(category, dto);

        return await this.categoryRepository.save(updatedCategory);
    }

    //menghapus data cattegory berdaserkan id
    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);

        await this.categoryRepository.delete(id);

        return {
            message: `Kategori ${id} berhasil dihapus`,
            deletedId: id,
        };
    }

    // name harus unik (sesuai PDF)
    private async checkNameUnique(name: string): Promise<void> {
        const exists = await this.categoryRepository.findOne({ where: { name } });

        if (exists) {
            throw new ConflictException(`Kategori "${name}" sudah ada`);
        }
    }
}