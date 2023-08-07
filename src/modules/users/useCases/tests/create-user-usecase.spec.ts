import { Test } from "@nestjs/testing"
import { CreateUserUseCase } from "../create-user.usecase"
import { CreateUserDTO } from "../../dto/user.dto";
import { IUserRepository } from "../../repositories/user.repository";
import { UserInMemoryReposirory } from "../../repositories/in-memory/user-in-memory.repository";

describe("CreateUserUseCase", () => {

    let createUserUseCase: CreateUserUseCase;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CreateUserUseCase,
                {
                    provide: IUserRepository,
                    useClass: UserInMemoryReposirory,
                    // useValue: {
                    //     findByUsernameOrEmail: jest.fn(),
                    //     save: jest.fn(),
                    // }
                }
            ]
        }).compile()

        createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    })

    it("should be able to create a new user", async () => {
        const data: CreateUserDTO = {
            email: 'email@test.com',
            name: 'Name test',
            password: '<PASSWORD>',
            username: 'usermae_test'
        }

        const result = await createUserUseCase.execute(data);
        console.log(result);

        expect(result).toHaveProperty('id');
    });

    it("should not be able to create a new user with username or email already exists", async () => {
        const data: CreateUserDTO = {
            email: 'email_already_exists@test.com',
            name: 'Name test',
            password: '<PASSWORD>',
            username: 'username_already_exists'
        };
        await createUserUseCase.execute(data);
        expect(createUserUseCase.execute(data)).rejects.toThrowError();
    });
});

