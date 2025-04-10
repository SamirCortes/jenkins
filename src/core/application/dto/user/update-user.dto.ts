import { Types as MongooseTypes } from 'mongoose'

export interface UpdateUserDto {
    _id: MongooseTypes.ObjectId
    names?: string
    surnames?: string
    password: string
    email?: string
}
