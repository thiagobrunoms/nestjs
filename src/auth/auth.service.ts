import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user_repository';
import { AuthCredentialsDTO } from './dto/auth-credentials';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './entities/jwt_payload.entity.interface';
import { Token } from './entities/token_payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(
    authControllerDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: Token }> {
    const username = await this.userRepository.validateUserPassword(
      authControllerDTO,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    // return { accessToken };
    const token = new Token();
    token.token = accessToken;
    token.expiresIn = new Date();
    token.refreshToken = refreshToken;
    token.expiresRefreshIn = new Date();

    return { accessToken: token };
  }
}
