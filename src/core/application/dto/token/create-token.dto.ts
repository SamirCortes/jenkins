import { User } from '@core/domain/models/user.model'

export class CreateTokenDto {
    _id?: null
    userId: string
    token: string
    user?: User
}
