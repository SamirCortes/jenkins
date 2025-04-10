// src/infraestructure/adapters/mongodb/database-mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMongoService } from './database-mongo.service';
import { TOKEN_MODEL, USER_MODEL } from '../../shared/constants';
import { MongoDBProviders } from './mongodb.providers';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_DB_URL,
        dbName: 'xpert-group',
      }),
    }),
  ],
  providers: [
    DatabaseMongoService,
    ...MongoDBProviders,
  ],
  exports: [MongooseModule, USER_MODEL, TOKEN_MODEL],
})
export class DatabaseMongoModule { }
