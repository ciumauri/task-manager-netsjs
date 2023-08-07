import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        const payload = await this.jwtService.verifyAsync(token, {
            secret: 'secretKey'
        })

        request['user'] = payload;

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return null;
        }

        return token;
    }
}