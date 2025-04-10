import { Document, FilterQuery, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { Types } from 'mongoose'

export interface RepositoryModelsMongoOutputPort<T extends Document, CreateDto, UpdateDto> {
    findAll(queryParams?: { page?: number; limit?: number }): Promise<T[]>;
    delete(id: Types.ObjectId): Promise<UpdateWriteOpResult>;
    findByWhere(where: FilterQuery<T>): Promise<T[]>;
    updateAndWhere(criteria: FilterQuery<T>, model: UpdateQuery<T>): Promise<UpdateWriteOpResult>;
    findOneByWhere(where: FilterQuery<T>, relations?: string[]): Promise<T>;
    exists(filter: any): Promise<boolean>;
    create(createDto: CreateDto): Promise<T>;
    update(id: Types.ObjectId, updateDto: UpdateDto): Promise<T | null>;
}
