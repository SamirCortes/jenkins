import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from '../guards/jwt-auth.guard';
import { BreedInputPort } from '@core/application/ports/input/breed-input.port';
import { BreedUseCase } from '@core/application/use-cases/breed.usecase';

@ApiTags('Gatos')
@Controller('breeds')
export class BreedController implements BreedInputPort {
  constructor(private readonly breedUseCase: BreedUseCase) {}

  @Get('/')
  // @UseGuards(AuthJwtGuard)
  getAllBreeds(): Promise<any> {
    return this.breedUseCase.getAllBreeds();
  }

  @Get('/:breed_id')
  @UseGuards(AuthJwtGuard)
  getBreedById(@Param('breed_id') id: string): Promise<any> {
    return this.breedUseCase.getBreedById(id);
  }

  @Get('/search/:search')
  @UseGuards(AuthJwtGuard)
  getBreedBySearch(@Param('search') search: string): Promise<any> {
    return this.breedUseCase.getBreedBySearch(search);
  }

  @Get('/images/:search')
  @UseGuards(AuthJwtGuard)
  getBreedByImages(@Param('search') search: string): Promise<any> {
    return this.breedUseCase.getBreedByImages(search);
  }
}
