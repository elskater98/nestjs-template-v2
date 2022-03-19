import {SetMetadata} from '@nestjs/common';
import {RoleEnum} from "../users/dto/create-user.dto";

export const Roles = (...args: RoleEnum[]) => SetMetadata('roles', args);
