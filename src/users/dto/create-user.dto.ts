import {ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsNotEmpty, MaxLength, MinLength} from "class-validator";

enum RoleEnum {
    Admin = "Admin",
    User = "User",
    Provider = "Provider"
}

class CreateUserDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;

    @IsDate()
    createdOn: Date = new Date()

    @IsArray()
    @ArrayNotEmpty()
    roles: RoleEnum[] = [RoleEnum.User]

    @IsBoolean()
    @IsNotEmpty()
    isEnabled: boolean = true

    constructor(values: object = {}) {
        Object.assign(this as CreateUserDto, values);
    }
}

export {CreateUserDto, RoleEnum}
