// src/infraestructure/adapters/mongodb/mongodb.providers.ts
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { UserSchema, UserDocument } from './schemas/user.schema';
import { TokenSchema, TokenDocument  } from './schemas/token.schema';
import { USER_MODEL, TOKEN_MODEL } from '../../shared/constants';
import { SchemaRepository } from 'src/infraestructure/repositories/schema.repository';
import { CreateUserDto } from '@core/application/dto/user/create-user.dto';
import { UpdateUserDto } from '@core/application/dto/user/update-user.dto';

export const MongoDBProviders = [
    {
        provide: USER_MODEL,
        useFactory: (connection: Connection) => {
            const userModel = connection.model<UserDocument>('User', UserSchema);
            return new SchemaRepository<UserDocument, CreateUserDto, UpdateUserDto>(userModel);
        },
        inject: [getConnectionToken()],
    },
    {
        provide: TOKEN_MODEL,
        useFactory: (connection: Connection) => {
            const tokenModel = connection.model<TokenDocument>('Token', TokenSchema);
            return new SchemaRepository<TokenDocument, CreateUserDto, UpdateUserDto>(tokenModel);
        },
        inject: [getConnectionToken()],
    },
];