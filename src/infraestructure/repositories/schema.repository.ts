import { IEntity } from '@core/application/interfaces/IEntity';
import { RepositoryModelsMongoOutputPort } from '@core/application/ports/output/repository-models-mongo.output';
import { Model, Document, FilterQuery, UpdateQuery, UpdateWriteOpResult, Types } from 'mongoose';

export class SchemaRepository<T extends Document & IEntity, CreateDto, UpdateDto> implements RepositoryModelsMongoOutputPort<T, CreateDto, UpdateDto> {
    protected readonly _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    async findAll(): Promise<T[]> {
        return await this._model.find({ deletedAt: { $exists: false } }).exec();
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id).exec();
    }

    async findOne(filter: any): Promise<T | null> {
        return await this._model.findOne({ ...filter, deletedAt: { $exists: false } }).exec();
    }

    async exists(filter: any): Promise<boolean> {
        const count = await this._model.countDocuments({ ...filter, deletedAt: { $exists: false } } ).exec();
        return count > 0;
    }

    async create(createDto: CreateDto): Promise<T> {
        return await this._model.create(createDto);
    }

    async update(id: Types.ObjectId, updateDto: UpdateDto): Promise<T | null> {
        return await this._model
            .findByIdAndUpdate(id, { $set: updateDto }, { new: true })
            .exec();
    }

    async delete(id: Types.ObjectId): Promise<UpdateWriteOpResult> {
        const currentDate = new Date();
        return await this._model.updateOne({ _id: id }, { $set: { deletedAt: currentDate } }).exec();
    }

    async findByWhere(where: FilterQuery<T>): Promise<T[]> {
        return await this._model.find({ where, deletedAt: { $exists: false } }).exec();
    }

    async updateAndWhere(criteria: FilterQuery<T>, model: UpdateQuery<T>): Promise<UpdateWriteOpResult> {
        return await this._model.updateMany(criteria, model).exec();
    }

    async findOneByWhere(where: FilterQuery<T>): Promise<T | null> {
        return await this._model.findOne({ ...where, deletedAt: { $exists: false } }).exec();
    }
}
