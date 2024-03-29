import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [PrismaModule, AuthModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
