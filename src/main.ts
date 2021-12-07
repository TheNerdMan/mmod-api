import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaDalc } from './dalc/prisma.dalc';
import { AppModule } from './app.module';
import { appConfig } from '../config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Momentum Mod API')
    .setDescription('The Momentum Mod API - Made with 💖')
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaDalc: PrismaDalc = app.get(PrismaDalc);
  prismaDalc.enableShutdownHooks(app)

  await app.listen(appConfig.port);
}
bootstrap();
