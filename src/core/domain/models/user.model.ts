import { Exclude, Expose } from 'class-transformer'
import { Types as MongooseTypes } from 'mongoose'

@Exclude()
export class User {
    @Expose()
    _id?: MongooseTypes.ObjectId
    names?: string
    surnames?: string
    email?: string
    password?: string

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}
