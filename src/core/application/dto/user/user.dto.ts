import { Types as MongooseTypes } from 'mongoose'

export class UserDto {
    _id?: MongooseTypes.ObjectId
    names?: string
    surnames?: string
    email?: string
    password?: string
    isActive?: boolean
    isBlock?: boolean
    isConfirmed?: boolean
}
