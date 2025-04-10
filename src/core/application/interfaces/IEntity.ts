import { Types as MongooseTypes } from 'mongoose'

export interface IEntity {
  _id: MongooseTypes.ObjectId
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

