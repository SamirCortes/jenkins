import { Global, Module } from '@nestjs/common'
import { ConfigEnvModule } from './config/config.module'
import { DatabaseMongoModule } from './mongodb/database-mongo.module'
import { DatabaseMongoService } from './mongodb/database-mongo.service'
import { JWTTokenRepository } from '../repositories/jwt-token.repository'
import { JwtTokenModule } from './jwt-token/jwttoken.module'
import { BreedsRepository } from '../repositories/breeds.respository'
import { BreedModule } from './breeds/breed.module'

export const JWT_TOKEN_REPOSITORY = 'JWT_TOKEN_REPOSITORY'
export const BREED_REPOSITORY = 'BREED_REPOSITORY'

const PROVIDERS = [
    JWTTokenRepository,
    BreedsRepository,
    {
        provide: JWT_TOKEN_REPOSITORY,
        useExisting: JWTTokenRepository,
    },
    {
        provide: BREED_REPOSITORY,
        useExisting: BreedsRepository,
    },
]

@Global()
@Module({
    imports: [
        BreedModule,
        ConfigEnvModule,
        DatabaseMongoModule,
        JwtTokenModule,
    ],
    providers: [DatabaseMongoService, ...PROVIDERS],
    exports: [DatabaseMongoModule, DatabaseMongoService, ...PROVIDERS],
})
export class AdaptersModule { }