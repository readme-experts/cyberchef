import { RecipeService } from '../recipes/recipe.service';
import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from '../auth/session/local.strategy';

@Module({
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    RecipeService,
    UserRepository,
    RecipeRepository,
    CategoryRepository,
    PrismaService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
