import { Injectable } from "@nestjs/common";
import { AvatarDTO } from "../dto/user.dto";
import { IStorage } from "../../../infra/providers/storage/storage";
import { IUserRepository } from "../repositories/user.repository";
import { extname } from "path";

@Injectable()
export class UploadAvatarUserUseCase {

    constructor(private storage: IStorage, private userRepository: IUserRepository) { }

    async execute(data: AvatarDTO) {
        const extFile = extname(data.file.originalname);
        const fileName = `${data.userId}${extFile}`;
        data.file.originalname = fileName;
        const file = await this.storage.upload(data.file, "avatar");

        const pathAvatarUser = `avatar/${data.file.originalname}`;

        this.userRepository.uploadAvatar(data.userId, pathAvatarUser);

        return file;
    }
}