import {IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

enum RoleEnum {
    Admin = "Admin",
    User = "User",
    Provider = "Provider"
}

class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;

    @IsDate()
    createdOn: Date = new Date()

    @IsArray()
    roles: RoleEnum[] = [RoleEnum.User]

    @IsBoolean()
    isEnabled: boolean = true

    constructor(values: object = {}) {
        Object.assign(this as CreateUserDto, values);
    }
}

export {CreateUserDto, RoleEnum}
