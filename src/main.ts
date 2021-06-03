import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const options = new DocumentBuilder()
    .setTitle(`JWT Swagger`)
    .setDescription(`JWT Authorization experience API`)
    .setVersion(`1.0`)
    .addBearerAuth(
      {
        in: `header`,
        type: `http`,
        scheme: `bearer`,
        bearerFormat: `JWT`
      },
      `accessToken`
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api`, app, document);

  await app.listen(9000);
}
main();
