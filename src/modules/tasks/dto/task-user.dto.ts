

export type TaskUserRequestDTO = {
    userId: string;
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    priority: "BAIXA" | "MEDIA" | "ALTA";
    status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
}

export type TaskUserResponseDTO = {
    id: string;
};

type TaskDTO = {
    startAt: Date;
    endAt: Date;
    title: string;
    description: string;
}

type UserDTO = {
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    avatarUrl: string | null;
}

export type TaskUserNotificationDTO = {
    id: string;
    taskId: string;
    userId: string;
    createdAt: Date;
    task: TaskDTO;
    user: UserDTO;
}



