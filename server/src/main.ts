import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // usuwa pola, które nie są zdefiniowane w DTO
      forbidNonWhitelisted: true, // wyrzuca błąd jeśli przesłane są dodatkowe pola
      transform: true, // automatycznie przekształca typy
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Farm Management Dashboard API')
    .setDescription('The Farm Management Dashboard API description')
    .setVersion('1.0')
    .addTag('Farm Management Dashboard')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
