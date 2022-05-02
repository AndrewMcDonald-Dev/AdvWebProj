import { defineStore } from "pinia";
import { convertDate } from "../utils/convertDate";
import { api } from "./myFetch";
import { useSession } from "./session";
import { User } from "./user";

export type Task = {
    _id: string;
    title: string;
    isCompleted: boolean;
    assignedTo: User;
    createdBy: User;
    dueDate: number;
    timeCreated: Date;
};

export const useTasks = defineStore("tasks", {
    state: () => ({
        tasks: [] as Task[],
        session: useSession(),
        currentTab: "All",
        newTask: "",
        toBeAssigned: "",
        newDueDate: "",
    }),
    actions: {
        changeTab(tab: string) {
            this.currentTab = tab;
        },
        async addTask() {
            if (!this.session.user)
                throw new Error("Current user not stored in addTask().");

            if (this.newTask && this.toBeAssigned && this.newDueDate) {
                const newTask = {
                    title: this.newTask,
                    isCompleted: false,
                    assignedTo: (await this.session.api(
                        `users/${this.toBeAssigned}`
                    )) as unknown as User,
                    createdBy: this.session.user as User,
                    dueDate: convertDate(this.newDueDate),
                };

                const task = (await this.session.api("tasks", newTask, "POST"))
                    .data as Task;

                this.newTask = "";
                this.toBeAssigned = "";
                this.newDueDate = "";

                await this.fetchTasks();
            }
        },
        changeToBeAssigned(handle: string) {
            this.toBeAssigned = handle;
        },
        async fetchTasks() {
            this.tasks = (await api("tasks")).data as Task[];
        },
    },
    getters: {
        displayedTasks: ({ tasks, currentTab, session }): Task[] => {
            if (!session.user)
                throw new Error("No user detected in displayedTasks()");
            switch (currentTab) {
                case "Created":
                    return tasks.filter(
                        ({ createdBy }) => createdBy._id === session.user?._id
                    );
                case "Assigned":
                    return tasks.filter(
                        ({ assignedTo }) => assignedTo._id === session.user?._id
                    );
                case "Upcoming":
                    return tasks.sort(
                        (task1, task2) => task1.dueDate - task2.dueDate
                    );
                case "Completed":
                    return tasks.filter(({ isCompleted }) => isCompleted);
                case "All":
                    return tasks.sort(
                        (task1, task2) =>
                            new Date(task2.timeCreated).getTime() -
                            new Date(task1.timeCreated).getTime()
                    );
                default:
                    return tasks;
            }
        },
    },
});
