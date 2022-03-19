import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {User} from "../users/entities/user.entity";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
