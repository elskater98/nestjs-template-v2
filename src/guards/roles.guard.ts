import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {RoleEnum} from "../users/dto/create-user.dto";
import {User} from "../users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler())

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.roles || user.roles.length == 0) {
            return false;
        }

        return this.matchRoles(roles, user.roles);
    }

    private matchRoles(requiredRoles: RoleEnum[], userRoles: any): boolean {
        const satisfiedRoles = requiredRoles.filter(role => userRoles.includes(role));
        return satisfiedRoles.length > 0;
    }
}
