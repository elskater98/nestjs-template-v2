import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let newUser = new this.userModel(createUserDto);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    findOne(id: string) {
        return this.userModel.find({email: id});
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({email: id}, {"$set": updateUserDto});
    }

    remove(id: string) {
        return this.userModel.deleteOne({email: id});
    }
}
