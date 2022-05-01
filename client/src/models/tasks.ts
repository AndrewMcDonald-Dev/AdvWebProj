import { defineStore } from 'pinia';
import { convertDate } from '../utils/convertDate';
import { api } from './myFetch';
import { useSession } from './session';
import { User } from './user';

export type task = {
    title: string;
    isCompleted: boolean;
    assignedTo: User;
    createdBy: User;
    dueDate: number;
    timeCreated: Date;
};

export const useMessages = defineStore('message', {
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
                const newTask = {
                    title: this.newTask,
                    isCompleted: false,
                    assignedTo: (await api(
                        `users${this.toBeAssigned}`
                    )) as unknown as User,
                    createdBy: this.session.user,
                    dueDate: convertDate(this.newDueDate),
                    timeCreated: new Date(),
                };
                await this.session.api('tasks', newTask, 'POST');
                this.tasks.unshift(newTask);
                this.newTask = '';
                this.toBeAssigned = '';
                this.newDueDate = '';
            }
        },
        changeToBeAssigned(handle: string) {
            this.toBeAssigned = handle;
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
                            task2.timeCreated.getTime() -
                            task1.timeCreated.getTime()
                    );
                default:
                    return tasks;
            }
        },
    },
});
