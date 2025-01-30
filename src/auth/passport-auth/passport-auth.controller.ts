import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportLocalGuard } from '../passport-local/passport-local.guard';
import { PassportJwtGuard } from '../passport-jwt/passport-jwt.guard';


@Controller('passport-auth')
export class PassportAuthController {
    constructor(private  authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(@Request() req) {
        return this.authService.signIn(req.user);
    }

    
    @Get('profile')
    @UseGuards(PassportJwtGuard)
    async profile(@Request() req) {
        return req.user;
    }
}