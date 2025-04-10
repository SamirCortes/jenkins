export interface BreedsOutputPort {
    getAllBreeds(): Promise<any>
    getBreedById(id: string): Promise<any>
    getBreedBySearch(search: string): Promise<any>
    getBreedByImages(image: string): Promise<any>
}
