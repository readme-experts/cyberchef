import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipe.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './client/dist'),
    }),
    RecipeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
