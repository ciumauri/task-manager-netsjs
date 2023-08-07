import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateTaskUserUseCase } from "./useCases/create-task-user.usecase";
import { TaskUserController } from "./task-user.controller";
import { TaskUserPrismaRepository } from "./repositories/prisma/task-user.prisma.repository";
import { ITaskUserRepository } from "./repositories/task-user.repository";

@Module({
    controllers: [TaskUserController],
    providers: [
        PrismaService, CreateTaskUserUseCase,
        {
            provide: ITaskUserRepository,
            useClass: TaskUserPrismaRepository
        }
    ],

})

export class TaskUserModule { }


