'use strict';

class CategoryRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async add(name) {
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

  async findAll() {
    const allCategories = await this.prisma.categories.findMany();
    return allCategories; //returns an array of all categories
  }
}

exports.CategoryRepository = CategoryRepository;
