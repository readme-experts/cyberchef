// import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { PrismaService } from './prisma.service'

// @Module({
//   imports: [],
//   controllers: [UserController],
//   providers: [PrismaService],
// })
// export class AppModule {}




import {Module} from "@nestjs/common";
import { RecipeModule } from './recipes/recipe.module';
import { PrismaService } from './prisma.service'
import { UserModule } from "user/user.module";

@Module({
  imports: [RecipeModule,UserModule],
})
export class AppModule {}
