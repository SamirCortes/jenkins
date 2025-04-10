import { Injectable } from '@nestjs/common'
import { User } from '../../domain/models/user.model'
import { UserDto } from '../dto/user/user.dto'

@Injectable()
export class UsersMapper {
    userToDto(user: User | User[]): UserDto | UserDto[] {
        if (Array.isArray(user)) {
            return user.map((u) => this.mapUserToDto(u))
        } else {
            return this.mapUserToDto(user)
        }
    }

    private mapUserToDto(user: User): UserDto {
        const userDto: UserDto = new UserDto()
        userDto._id = user._id
        userDto.names = user.names
        userDto.email = user.email
        return userDto
    }
}
