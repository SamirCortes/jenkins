import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongooseTypes, Document as DocumentMongoose } from 'mongoose';

@Schema({
    timestamps: true,
    collection: 'users',
})
export class User extends DocumentMongoose {
    @Prop({
        type: MongooseTypes.ObjectId,
        auto: true,
    })
    _id: MongooseTypes.ObjectId;

    @Prop({
        type: String,
        required: true,
        maxlength: 45,
        comment: 'Nombres del usuario',
    })
    names: string;

    @Prop({
        type: String,
        required: true,
        maxlength: 45,
        comment: 'Apellidos del usuario',
    })
    surnames: string;

    @Prop({
        type: String,
        required: true,
        maxlength: 200,
        comment: 'Correo del usuario',
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        comment: 'Contraseña del usuario',
    })
    password: string;

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
        select: false,
        comment: 'Fecha de eliminación',
    })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & DocumentMongoose;
