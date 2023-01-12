import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RecipeController],
  providers: [
    RecipeService,
    RecipeRepository,
    CategoryRepository,
    PrismaService,
  ],
})
export class RecipeModule {}
