import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }).min(3).max(55),
    email: z.string({
        required_error: 'Email is required'
    }).email(),
    password: z.string({
        required_error: 'Password is required'
    }).min(6).max(10),
    username: z.string({
        required_error: 'Username is required'
    }).max(55)
})

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) { }

export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({
    password: true
})

export type CreateUserResponseSchemaDTO = z.infer<typeof CreateUserResponseSchemaDTO>