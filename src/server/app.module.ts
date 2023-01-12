import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipe.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [RecipeModule, UserModule, AuthModule],
})
export class AppModule {}
