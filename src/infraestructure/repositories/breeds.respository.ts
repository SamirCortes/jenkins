import { Injectable } from '@nestjs/common'
import { BreedsOutputPort } from '@core/application/ports/output/breeds-output.port';
import { BreedApi } from '../adapters/breeds/breed.api';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BreedsRepository implements BreedsOutputPort {
    constructor(private readonly _breedService: BreedApi) { }

    async getAllBreeds(): Promise<any> {
        return await this._breedService.getAllBreeds().then((data) => data)
    }

    async getBreedById(id: string): Promise<any> {
        return await this._breedService.getBreedById(id).then((data) => data)
    }

    async getBreedBySearch(search: string): Promise<any> {
        return await this._breedService.getBreedBySearch(search).then((data) => data)
    }

    async getBreedByImages(image: string): Promise<any> {
        return await this._breedService.getBreedByImages(image).then((data) => data)
    }

}
