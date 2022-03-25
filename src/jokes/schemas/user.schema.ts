import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop()
    username: string;

    @Prop([String])
    jokes: string[];
 
}
export const UserSchema = SchemaFactory.createForClass(User);