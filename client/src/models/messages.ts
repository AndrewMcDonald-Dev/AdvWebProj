import { defineStore } from "pinia";
import session from "./session";

export type task = {
    title: string;
    isCompleted: boolean;
    assignedTo: number;
    createdBy: number;
    dueDate: number;
};

export const useMessages = defineStore("message", {
    state: () => ({
        tasks: [
            {
                title: "Make Bulma great again",
                isCompleted: true,
                assignedTo: 1,
                createdBy: 2,
                dueDate: new Date().getTime() + 10000,
            },
            {
                title: "Add some more features",
                isCompleted: false,
                assignedTo: 1,
                createdBy: 1,
                dueDate: new Date().getTime() + 50000,
            },
            {
                title: "Make a github account",
                isCompleted: false,
                assignedTo: 2,
                createdBy: 1,
                dueDate: new Date().getTime() + 30000,
            },
            {
                title: "Learn how to use github",
                isCompleted: false,
                assignedTo: 3,
                createdBy: 2,
                dueDate: new Date().getTime() + 40000,
            },
            {
                title: "add a .gitignore file",
                isCompleted: false,
                assignedTo: 3,
                createdBy: 3,
                dueDate: new Date().getTime() + 20000,
            },
        ] as task[],
        currentTab: "All",
        newTask: "",
        toBeAssigned: 0,
    }),
    actions: {
        displayedTasks() {
            if (!session.user)
                throw new Error("No user detected in displayedTasks()");
            switch (this.currentTab) {
                case "Created":
                    return this.tasks.filter(
                        ({ createdBy }) => createdBy === session.user?.id
                    );
                case "Assigned":
                    return this.tasks.filter(
                        ({ assignedTo }) => assignedTo === session.user?.id
                    );
                case "Upcoming":
                    return this.tasks.sort(
                        (task1, task2) => task1.dueDate - task2.dueDate
                    );
                default:
                    return this.tasks;
            }
        },
        changeTab(tab: string) {
            this.currentTab = tab;
        },
        addTask() {
            if (!session.user)
                throw new Error("Current user not stored in addTask().");

            if (this.newTask && this.toBeAssigned) {
                this.tasks.unshift({
                    title: this.newTask,
                    isCompleted: false,
                    assignedTo: this.toBeAssigned,
                    createdBy: session.user.id,
                    // ! Decided to just make the due date exactly one day after the creation
                    // ! of the task because cant implement interface for selecting date quite yet
                    dueDate: new Date().getTime() + 86400000,
                });
                this.newTask = "";
                this.toBeAssigned = 0;
            }
        },
        changeToBeAssigned(id: number) {
            this.toBeAssigned = id;
        },
    },
});
