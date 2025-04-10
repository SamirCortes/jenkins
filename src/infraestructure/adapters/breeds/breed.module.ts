import { Module } from '@nestjs/common';
import { BreedApi } from './breed.api';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [BreedApi],
    exports: [BreedApi], 
})
export class BreedModule { }
