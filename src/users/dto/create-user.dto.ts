import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNotEmptyObject,
    IsOptional,
    MaxLength,
    MinLength
} from "class-validator";

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
    @MaxLength(32)
    password: string;

    @IsDate()
    createdOn: Date = new Date()

    @IsArray()
    @ArrayNotEmpty()
    roles: RoleEnum[] = [RoleEnum.User]

    @IsBoolean()
    @IsNotEmpty()
    isEnabled: boolean = true
}

export {CreateUserDto, RoleEnum}
