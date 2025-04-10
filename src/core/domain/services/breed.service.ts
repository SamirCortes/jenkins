
import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose';
import { BreedsOutputPort } from '@core/application/ports/output/breeds-output.port';

@Injectable()
export class BreedService {
    constructor(
        private readonly breedsOutputPort: BreedsOutputPort,
    ) {}

   
    getAllBreeds(): Promise<any> {
        return  this.breedsOutputPort.getAllBreeds()

    }
    getBreedById(id: string): Promise<any> {
        return this.breedsOutputPort.getBreedById(id)
    }

    getBreedBySearch(search: string): Promise<any> {
        return this.breedsOutputPort.getBreedBySearch(search)
    }

    getBreedByImages(image: string): Promise<any> {
        return this.breedsOutputPort.getBreedByImages(image)
    }

}
