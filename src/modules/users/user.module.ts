/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { PrismaService } from "../../infra/database/prisma.service";
import { IUserRepository } from "./repositories/user.repository";
import { UserPrismaRepository } from "./repositories/prisma/user.prisma.repository";
import { ProfileUserUseCase } from "./useCases/profile-user.usecase";
import { UploadAvatarUserUseCase } from "./useCases/upload-avatar-user.usecase";
import { SupabaseStorage } from "src/infra/providers/storage/supabase.storage";
import { IStorage } from "src/infra/providers/storage/storage";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        PrismaService,
        {
            provide: IUserRepository,
            useClass: UserPrismaRepository,
        },
        {
            provide: IStorage,
            useClass: SupabaseStorage
        }
    ],
})
export class UserModule { }