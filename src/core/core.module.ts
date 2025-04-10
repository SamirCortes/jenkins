// src/core/core.module.ts
import { Module } from '@nestjs/common';
import { AdaptersModule, BREED_REPOSITORY, JWT_TOKEN_REPOSITORY } from 'src/infraestructure/adapters/adapters.module';
import { UserService } from './domain/services/user.service';
import { UserUseCase } from './application/use-cases/user.usecase';
import { UsersMapper } from './application/mappers/users.mapper';
import { DatabaseMongoModule } from 'src/infraestructure/adapters/mongodb/database-mongo.module'; // Importa DatabaseMongoModule
import { TOKEN_MODEL, USER_MODEL } from 'src/infraestructure/shared/constants';
import { AuthUseCase } from './application/use-cases/auth.usecase';
import { AuthService } from './domain/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BreedUseCase } from './application/use-cases/breed.usecase';
import { BreedService } from './domain/services/breed.service';

const PROVIDERS = [
    JwtService,
    UserService,
    UserUseCase,
    UsersMapper,
    AuthUseCase,
    AuthService,
    BreedUseCase,
    BreedService
];

@Module({
    imports: [
        AdaptersModule,
        DatabaseMongoModule, // Asegúrate de importar DatabaseMongoModule
    ],
    providers: [
        ...PROVIDERS,
        {
            provide: UserService,
            useFactory: (userRepository) => new UserService(userRepository),
            inject: [USER_MODEL],
        },
        {
            provide: AuthService,
            useFactory: (jWTTokenOutputPort, authRepository) => new AuthService(jWTTokenOutputPort, authRepository),
            inject: [JWT_TOKEN_REPOSITORY, TOKEN_MODEL],
        },
        {
            provide: BreedService,
            useFactory: (breedsOutputPort) => new BreedService(breedsOutputPort),
            inject: [BREED_REPOSITORY],
        }
    ],
    exports: [...PROVIDERS],
})
export class CoreModule { }
