import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/modules/tasks/repositories/task-user.repository";

type MessageDTO = {
    name: string,
    email: string,
    startAt: Date,
    endAt: Date,
    title: string,
    description: string,
}

@Injectable()
export class NotificationTaskUserSchedule {

    constructor(private taskRepository: ITaskUserRepository,
        @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
    ) { }

    @Cron(CronExpression.EVERY_12_HOURS)
    async getAllTasksDay() {
        const allTasks = await this.taskRepository.findAllStartDay();

        console.log("=== NOTIFICANDO ===");

        if (allTasks) {
            allTasks.forEach((task) => {
                const message: MessageDTO = {
                    name: task.user.name,
                    email: task.user.email,
                    title: task.task.title,
                    description: task.task.description,
                    startAt: task.task.startAt,
                    endAt: task.task.endAt,
                }
                this.notificationClient.emit("task_notification", message);
            });
        }
    }

}