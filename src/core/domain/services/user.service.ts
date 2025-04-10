// Importaciones de módulos y dependencias
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { RepositoryModelsMongoOutputPort } from '@core/application/ports/output/repository-models-mongo.output'
import { User, UserDocument } from 'src/infraestructure/adapters/mongodb/schemas/user.schema'
import { CreateUserDto } from '@core/application/dto/user/create-user.dto'
import { UpdateUserDto } from '@core/application/dto/user/update-user.dto'
import { USER_MODEL } from 'src/infraestructure/shared/constants'
import { Types } from 'mongoose'
import { CustomException } from '@core/application/exception/custom.exception'

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_MODEL) private readonly userOutputPort: RepositoryModelsMongoOutputPort<UserDocument, CreateUserDto, UpdateUserDto>
    ) { }
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto._id = null
        return this.userOutputPort.create(createUserDto).catch((error) => {
            throw new CustomException(
                'El registro: ya existe',
                HttpStatus.CONFLICT
            )
        })
    }

    async update(_id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userOutputPort.update(_id, updateUserDto)
    }

    async findById(_id: Types.ObjectId): Promise<User> {
        return this.userOutputPort.findOneByWhere({ _id })
    }

    async findOneByWhere(where: Partial<any>): Promise<User> {
        return this.userOutputPort.findOneByWhere(where)
    }

    async delete(id: Types.ObjectId): Promise<any> {
        return this.userOutputPort.delete(id)
    }

    async findAll(queryParams: {
        page?: number
        limit?: number
    }): Promise<User[]> {
        return this.userOutputPort.findAll()
    }

    async findByExists(where: Partial<User>): Promise<boolean> {
        return this.userOutputPort.exists(where)
    }
    
}
