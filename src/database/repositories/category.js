'use strict';

export default class CategoryRepository {
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
    return await this.prisma.categories.findMany(); //returns an array of all categories
  }
}
