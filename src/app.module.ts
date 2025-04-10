import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UserController } from './infraestructure/adapters/http/controllers/user.controller';
import { AuthController } from './infraestructure/adapters/http/controllers/auth.controller';
import { BreedController } from './infraestructure/adapters/http/controllers/breed.controller';

@Module({
  imports: [CoreModule],
  controllers: [UserController, AuthController, BreedController],
  providers: [],
})
export class AppModule {}
