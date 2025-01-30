import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private  authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: { email: string; username: string; password: string }) {
        return this.authService.authenticate(body);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Request() request) {
        return request.user;
    }
}