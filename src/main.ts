import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateSwaggerDocs } from '@core/application/utils/swagger.util';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwaggerDocs(app)
  await app.use(bodyParser.json())
  app.enableCors()
  await app.use(bodyParser.urlencoded({ extended: true }))
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
