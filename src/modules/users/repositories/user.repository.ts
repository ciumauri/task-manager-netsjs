import { CreateUserDTO, UserCreateDTO, UsernameAndEmail } from "../dto/user.dto";

export abstract class IUserRepository {
    abstract findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreateDTO | null>;
    abstract save(data: CreateUserDTO): Promise<UserCreateDTO>;
    abstract findByUsername(username: string): Promise<UserCreateDTO | null>;
    abstract findById(id: string): Promise<UserCreateDTO | null>;
    abstract uploadAvatar(id: string, path: string): Promise<void>;
}