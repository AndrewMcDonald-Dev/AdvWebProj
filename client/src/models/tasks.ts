import { defineStore } from 'pinia';
import { convertDate } from '../utils/convertDate';
import { api } from './myFetch';
import { useSession } from './session';
import { User } from './user';

export type task = {
    _id: string;
    title: string;
    isCompleted: boolean;
    assignedTo: User;
    createdBy: User;
    dueDate: number;
    timeCreated: Date;
};

export const useTasks = defineStore('message', {
    state: () => ({
        tasks: [] as task[],
        session: useSession(),
        currentTab: 'All',
        newTask: '',
        toBeAssigned: '',
        newDueDate: '',
    }),
    actions: {
        changeTab(tab: string) {
            this.currentTab = tab;
        },
        async addTask() {
            if (!this.session.user)
                throw new Error('Current user not stored in addTask().');

            if (this.newTask && this.toBeAssigned && this.newDueDate) {
                let newTask = {
                    title: this.newTask,
                    isCompleted: false,
                    assignedTo: (await api(
                        `users${this.toBeAssigned}`
                    )) as unknown as User,
                    createdBy: this.session.user,
                    dueDate: convertDate(this.newDueDate),
                    timeCreated: new Date(),
                };
                newTask = (await this.session.api('tasks', newTask, 'POST'))
                    .data as task;
                this.tasks.unshift(newTask as task);
                this.newTask = '';
                this.toBeAssigned = '';
                this.newDueDate = '';
            }
        },
        changeToBeAssigned(handle: string) {
            this.toBeAssigned = handle;
        },
        async fetchTasks() {
            this.tasks = (await api('tasks')).data as task[];
        },
    },
    getters: {
        displayedTasks: ({ tasks, currentTab, session }): task[] => {
            if (!session.user)
                throw new Error('No user detected in displayedTasks()');
            switch (currentTab) {
                case 'Created':
                    return tasks.filter(
                        ({ createdBy }) => createdBy._id === session.user?._id
                    );
                case 'Assigned':
                    return tasks.filter(
                        ({ assignedTo }) => assignedTo._id === session.user?._id
                    );
                case 'Upcoming':
                    return tasks.sort(
                        (task1, task2) => task1.dueDate - task2.dueDate
                    );
                case 'Completed':
                    return tasks.filter(({ isCompleted }) => isCompleted);
                case 'All':
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
