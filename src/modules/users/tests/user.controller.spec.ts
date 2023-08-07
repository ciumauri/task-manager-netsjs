import { Test } from "@nestjs/testing"
import { UserController } from "../user.controller"
import { CreateUserUseCase } from "../useCases/create-user.usecase"
import { CreateUserDTO } from "../dto/user.dto"
import { IUserRepository } from "../repositories/user.repository"
import { JwtModule } from "@nestjs/jwt"
import { ProfileUserUseCase } from "../useCases/profile-user.usecase"
import { UploadAvatarUserUseCase } from "../useCases/upload-avatar-user.usecase"
import { IStorage } from "../../../infra/providers/storage/storage"
import { randomUUID } from "crypto"

describe("User Controller", () => {
    let userController: UserController;
    let userRepository: IUserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [JwtModule],
            controllers: [UserController],
            providers: [
                CreateUserUseCase,
                ProfileUserUseCase,
                UploadAvatarUserUseCase,
                {
                    provide: IUserRepository,
                    useValue: {
                        findByUsernameOrEmail: jest.fn(),
                        save: jest.fn(),
                    }
                },
                {
                    provide: IStorage,
                    useValue: {
                        upload: jest.fn()
                    }
                }
            ]
        }).compile()
        userController = moduleRef.get<UserController>(UserController)
        userRepository = moduleRef.get<IUserRepository>(IUserRepository)
    })

    it("should be able to create a new user", async () => {
        const body: CreateUserDTO = {
            email: 'email@test.com',
            name: 'Name test',
            password: '<PASSWORD>',
            username: 'usermae_test'
        };

        jest.spyOn(userRepository, 'save').mockResolvedValue({
            ...body,
            id: randomUUID(),
            createdAt: new Date(),
        })

        const result = await userController.create(body);
        console.log({ result });
        expect(result).toHaveProperty('success');
    });
})