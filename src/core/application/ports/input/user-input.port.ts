import { CreateUserDto } from "@core/application/dto/user/create-user.dto"
import { UpdateUserDto } from "@core/application/dto/user/update-user.dto"
import { Response } from "@core/domain/models/reponse-http.model"

export interface UserInputPort {
    create(createUserDto: CreateUserDto): Promise<Response>
    forId(uid: string): Promise<Response>
    update(updateUserDto: UpdateUserDto): Promise<Response>
    delete(uid: string): Promise<Response>
    all(page?: number, limit?: number): Promise<Response>
}
