import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.jwt;
    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    const decodedToken = this.jwtService.decode(token);
    if (decodedToken.role !== 'admin') {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
