import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const config = new DocumentBuilder()
    .setTitle('Hiring Job API')
    .setDescription('Hiring Job API Swagger Documentation')
    .setVersion('1.0')
    .addTag('hiring-job')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.DEV_ORIGIN_URL,
    allowedHeaders: 'Content-Type, Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
