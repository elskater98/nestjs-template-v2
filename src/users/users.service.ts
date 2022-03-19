import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {DuplicateIdentifierException} from "../exceptions/DuplicateIdentifierException";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        if (await this.userModel.exists({username: createUserDto.username})) {
            throw new DuplicateIdentifierException(`The email ${createUserDto.username} already exists.`);
        }
        
        let newUser = new this.userModel(createUserDto);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser.save();
    }

    async findAll(projection: object = {}): Promise<User[]> {
        return this.userModel.find({}, projection);
    }

    async findOne(id: string, projection: object = {}): Promise<User> {
        return this.userModel.findOne({username: id}, projection);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({username: id}, {"$set": updateUserDto});
    }

    remove(id: string) {
        return this.userModel.deleteOne({username: id});
    }
}
