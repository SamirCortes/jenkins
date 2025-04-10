import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongooseTypes, Document as DocumentMongoose } from 'mongoose';

@Schema({
    timestamps: true,
    collection: 'tokens',
})
export class Token extends DocumentMongoose {
    @Prop({
        type: MongooseTypes.ObjectId,
        auto: true,
    })
    _id: MongooseTypes.ObjectId;

    @Prop({ type: MongooseTypes.ObjectId, required: false })
    user: MongooseTypes.ObjectId

    @Prop({
        type: String,
        required: true,
        comment: 'Token del usuario',
    })
    token: string;
    
    @Prop({
        type: Date,
        default: Date.now,
        comment: 'Fecha de creación',
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: Date.now,
        comment: 'Fecha de actualización',
    })
    updatedAt: Date;

    @Prop({
        type: Date,
        comment: 'Fecha de eliminación',
    })
    deletedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
export type TokenDocument = Token & DocumentMongoose;
