import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto, RoleEnum} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../decorators/roles.decorator";
import {RolesGuard} from "../guards/roles.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles(RoleEnum.Admin)
    //@Roles(RoleEnum.Admin,RoleEnum.User,RoleEnum.Provider)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id, {password: 0});
        delete user.password;
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(RoleEnum.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
