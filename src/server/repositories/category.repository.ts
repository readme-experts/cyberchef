import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryEntity } from '../prisma/Entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async add(name: string): Promise<boolean> {
    try {
      await this.prisma.categories.create({
        data: {
          name,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.prisma.categories.findMany(); //returns an array of all categories
  }
}
