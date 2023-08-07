import { randomUUID } from "crypto";
import { UsernameAndEmail, UserCreateDTO, CreateUserDTO } from "../../dto/user.dto";
import { IUserRepository } from "../user.repository";

export class UserInMemoryReposirory implements IUserRepository {
    users: UserCreateDTO[] = [];
    async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreateDTO | null> {
        const findUser = this.users.find(user => (user.username === data.username) || (user.email === data.email));
        return findUser ?? null;
    }

    async save(data: CreateUserDTO): Promise<UserCreateDTO> {
        const user: UserCreateDTO = {
            ...data,
            id: randomUUID(),
            createdAt: new Date(),
        };
        this.users.push(user);
        return user;
    }
    findByUsername(username: string): Promise<UserCreateDTO | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<UserCreateDTO | null> {
        throw new Error("Method not implemented.");
    }
    uploadAvatar(id: string, path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}