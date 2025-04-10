import { CreateTokenDto } from '@core/application/dto/token/create-token.dto';
import { JWTTokenOutputPort } from '@core/application/ports/output/jwt-token-output.port'
import { Inject, Injectable } from '@nestjs/common'
import { Token } from '../models/token.model';
import { RepositoryModelsMongoOutputPort } from '@core/application/ports/output/repository-models-mongo.output';
import { TOKEN_MODEL } from 'src/infraestructure/shared/constants';
import { TokenDocument } from 'src/infraestructure/adapters/mongodb/schemas/token.schema';
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: JWTTokenOutputPort,
        @Inject(TOKEN_MODEL) private readonly tokenRepository: RepositoryModelsMongoOutputPort<TokenDocument, CreateTokenDto, any>
    ) {}

    async generateToken(payload: { sub: string; email: string }): Promise<any> {
        return this.authRepository.generate(payload)
    }

    async decodeToken(
        token: string
    ): Promise<{ exp: number; sub: string; iat: number }> {
        return this.authRepository.decode(token)
    }

    async storeToken(createTokenDto: CreateTokenDto): Promise<any> {
        createTokenDto._id = null
        return this.tokenRepository.create(createTokenDto)
    }

    async findToken(token: string): Promise<Token> {
        return await this.tokenRepository.findOneByWhere({ token, deletedAt: { $exists: false } })
    }

    async removeToken(token: Token): Promise<any> {
        const tokenFind = await this.tokenRepository.findOneByWhere({ _id: new ObjectId(token.id), deletedAt: { $exists: false }})
        return await this.tokenRepository.delete(tokenFind._id)
    }
}
