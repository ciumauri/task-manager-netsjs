import { IUserRepository } from "../user.repository";
import { CreateUserDTO, UserCreateDTO, UsernameAndEmail } from "../../dto/user.dto";
import { PrismaService } from "../../../../infra/database/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private prisma: PrismaService) { }

    async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreateDTO | null> {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: data.username },
                    { email: data.email }
                ]
            },
        });
    }

    async save(data: CreateUserDTO): Promise<UserCreateDTO> {
        return this.prisma.user.create({
            data,
        });
    }

    async findByUsername(username: string): Promise<UserCreateDTO | null> {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        })
    }

    async findById(id: string): Promise<UserCreateDTO | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        })
    }

    async uploadAvatar(id: string, path: string): Promise<void> {
        await this.prisma.user.update({
            data: {
                avatarUrl: path,
            },
            where: {
                id,
            }
        })
    }

}