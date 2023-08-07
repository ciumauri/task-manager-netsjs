import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { ProfileUserUseCase } from "./useCases/profile-user.usecase";
import { CreateUserResponseSchemaDTO, CreateUserSchema, CreateUserSchemaDTO } from "./schemas/create-user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDTO } from "./dto/user.dto";
import { UploadAvatarUserUseCase } from "./useCases/upload-avatar-user.usecase";
import { AuthGuard } from "../../infra/providers/auth-guard-provider";
import { zodToOpenAPI } from "nestjs-zod";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);

@Controller('/users')
@ApiTags('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly profileUserUseCase: ProfileUserUseCase,
        private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
    ) { }

    @Post()

    @ApiBody({
        description: 'Creation of users',
        schema: schemaUserSwagger
    })
    @ApiResponse({
        status: 201,
        description: 'User created'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    async create(@Body() data: CreateUserSchemaDTO) {
        const user = await this.createUserUseCase.execute(data);
        return CreateUserResponseSchemaDTO.safeParse(user);
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async profile(@Request() req) {
        return this.profileUserUseCase.execute(req.user.sub);
    }

    @Put('/avatar')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            description: 'Upload avatar',
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    async uploadAvatar(
        @Request() req,
        @UploadedFile() file: FileDTO
    ) {
        const avatar = await this.uploadAvatarUserUseCase.execute({
            userId: req.user.sub,
            file
        });
        return avatar;
    }
}