import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization']; // 'Bareer <token>' , or const authorization = request.headers.authorization;
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = { email: payload.email, username: payload.username };
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}