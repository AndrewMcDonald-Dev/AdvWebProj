import { defineStore } from 'pinia';
import { api } from './myFetch';
import { useSession } from './session';

export interface User {
    firstName: string;
    lastName: string;
    handle: string;
    password: string;
    email: string;
    pic: string;
    _id: string;
    token?: string;
}

// export const findUser = (id: number): User => {
//     const user = list.find((user) => user.id === id);
//     if (!user) throw new Error('failed to find user in findUser');
//     return user;
// };

export const useUsers = defineStore('users', {
    state: () => ({
        list: [] as User[],
        session: useSession(),
    }),
    actions: {
        async fetchUsers() {
            this.list = await this.session.api('users');
        },
    },
    getters: {
        findUser:
            (state) =>
            (id: string): User => {
                const user = state.list.find(({ _id }) => _id === id);
                if (!user) throw new Error('failed to find user in findUser');
                return user;
            },
    },
});
