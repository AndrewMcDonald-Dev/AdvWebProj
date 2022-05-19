import { defineStore } from "pinia";
import { useSession } from "./session";

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

export const useUsers = defineStore("users", {
    state: () => ({
        list: [] as User[],
        session: useSession(),
    }),
    actions: {
        // async fetchUsers() {
        //     this.list = await this.session.api("users");
        // },
        async fetchUser(id: string) {
            const newUser = await this.session.api(`users/${id}`);
            const isFound = this.list.find((user) => user._id === newUser._id);
            if (!isFound) this.list.push(newUser);
        },
    },
    getters: {
        findUser:
            (state) =>
            (id: string): User => {
                const user = state.list.find(({ _id }) => _id === id);
                if (!user) throw new Error("failed to find user in findUser");
                return user;
            },
    },
});
