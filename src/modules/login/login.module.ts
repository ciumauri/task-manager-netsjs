import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'secretKey', // TODO: Change this to a secure key in production!
            signOptions: {
                expiresIn: '3600s'
            }
        })
    ],
    controllers: [LoginController],
    providers: [PrismaService, SignInUseCase],
})

export class LoginModule { }