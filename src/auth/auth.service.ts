import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string; password: string };
type SignInData = { email: string; username: string; password: string };
type AuthResult = { success: boolean; user?: SignInData; accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(input.username);
    if (user && user.password === input.password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { email: user.email, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      success: true,
      user,
      accessToken,
    };
  }
}