import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository, CategoryRepository],
})
export class RecipeModule {}
