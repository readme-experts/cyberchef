import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from './prisma.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
