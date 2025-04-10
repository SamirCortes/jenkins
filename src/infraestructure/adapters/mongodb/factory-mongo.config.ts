import { SchemaRepository } from 'src/infraestructure/repositories/schema.repository';
import { Model, Document } from 'mongoose';
import { IEntity } from '@core/application/interfaces/IEntity';

// Fábrica genérica para crear instancias de SchemaRepository
export const schemaRepositoryFactory = <
    T extends Document & IEntity,
    CreateDto,
    UpdateDto
>(
    model: Model<T>
) => {
    return () => {
        return new SchemaRepository<T, CreateDto, UpdateDto>(model);
    };
};
