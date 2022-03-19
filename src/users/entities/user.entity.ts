import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {RoleEnum} from "../dto/create-user.dto";

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
})
export class User {

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    createdOn: Date;

    @Prop()
    roles: RoleEnum[];

    @Prop()
    isEnabled: boolean
}


export const UserSchema = SchemaFactory.createForClass(User)