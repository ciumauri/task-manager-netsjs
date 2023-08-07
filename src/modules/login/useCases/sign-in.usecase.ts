import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDTO } from "../dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma.service";
import { compare } from "bcrypt";

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService, private prisma: PrismaService) { }

    async exexute(data: SignInDTO) {

        // Validar se username existe no BD
        const user = await this.prisma.user.findFirst({
            where: {
                username: data.username
            }
        })

        // Não Existe - Retorna erro
        if (!user) {
            throw new UnauthorizedException();
        }

        // Existe - Comparar senha
        const passwordMatch = await compare(data.password, user.password);

        // Senha não bate - Retorna erro
        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            username: user.username
        }

        const token = await this.jwtService.signAsync(payload)

        // Existe - Gerar o Token
        return {
            acess_token: token,
        };


    }
}
