<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { api } from '../models/myFetch';
import { useTasks } from '../models/tasks';
import { User, useUsers } from '../models/user';
import Tasks from './Tasks.vue';

const users = useUsers();
const tasks = useTasks()

onMounted(async () => {
    await tasks.fetchTasks()
    await tasks.tasks.forEach(async (task) => {
        await users.fetchUser(task.createdBy._id)
        await users.fetchUser(task.assignedTo._id)
    })

})

const name = ref('')


// If i could find a way to @input on the o-autocomplete I would have been able to finish this with an hour to spare
// I know i need to run teh function below to set some variable but idk how to trigger this function
const filteredDataObj = async (): Promise<User[] | null> => {
    const users = (await api(`users/search/${name.value}`)).data
    console.log(users);

    if (users) return users
    return null
}

</script>

<template>
    <div class="tabs is-boxed">
        <ul>
            <li :class="{ 'is-active': tasks.currentTab == 'Created' }" @click="tasks.changeTab('Created')">
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-clipboard-list"></i>
                    </span>
                    <span>Created</span>
                </a>
            </li>
            <li :class="{ 'is-active': tasks.currentTab == 'Assigned' }" @click="tasks.changeTab('Assigned')">
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-calendar-times"></i>
                    </span>
                    <span>Assigned</span>
                </a>
            </li>
            <li :class="{ 'is-active': tasks.currentTab == 'Upcoming' }" @click="tasks.changeTab('Upcoming')">
                <a>
                    <span class="icon is-small">
                        <i class="fa-solid fa-calendar-days"></i>
                    </span>
                    <span>Upcoming</span>
                </a>
            </li>
            <li :class="{ 'is-active': tasks.currentTab == 'Completed' }" @click="tasks.changeTab('Completed')">
                <a>
                    <span class="icon is-small">
                        <i class="fa-solid fa-calendar-check"></i>
                    </span>
                    <span>Completed</span>
                </a>
            </li>
            <li :class="{ 'is-active': tasks.currentTab == 'All' }" @click="tasks.changeTab('All')">
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-calendar"></i>
                    </span>
                    <span>All</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="panel-block">
        <form @submit.prevent="tasks.addTask" style="flex-grow: 1">
            <div class="columns">
                <div class="field has-addons column is-5">
                    <div class="control has-icons-left">
                        <input class="input is-primary" type="text" placeholder="New Task" v-model="tasks.newTask"
                            maxlength="35" required />
                        <span class="icon is-left">
                            <i class="fas fa-calendar-plus" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="control">
                        <button class="button is-primary">Add</button>
                    </div>
                </div>
                <div class="column is-3">
                    <!-- <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                <span>{{ tasks.toBeAssigned ? users.findUser(tasks.toBeAssigned).firstName : 'Worker'
                                }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                            <div class="dropdown-content">
                                <a class="dropdown-item mini-avatar" v-for="user in users.list"
                                    @click="tasks.changeToBeAssigned(user._id)">
                                    <figure class="image is-32x32">
                                        <img :src="user.pic" class="img is-rounded" />
                                    </figure>
                                    <p>{{ user.firstName }}</p>
                                </a>
                            </div>
                        </div>
                    </div> -->



                    <!-- <o-field>
                        <o-autocomplete rounded expanded v-model="name" :data="filteredDataArray" placeholder="Worker"
                            icon="search" clearable @select="(option: any) => tasks.toBeAssigned = option">
                            <template slot="empty">No results found</template>
                        </o-autocomplete>
                    </o-field> -->
                    <o-field>
                        <o-autocomplete v-model="name" placeholder="e.g. Anne" :data="filteredDataObj"
                            field='user.firstName' @select="(option: any) => tasks.toBeAssigned = option">
                        </o-autocomplete>
                    </o-field>
                </div>
                <div class="column is-3">
                    <input type="date" class="date-picker" required v-model="tasks.newDueDate" />
                </div>
            </div>
            <Tasks :tasks='tasks.displayedTasks' :currentTab="tasks.currentTab" :findUser="users.findUser"
                :deleteTask="tasks.deleteTask" :saveTask="tasks.saveTask" />
        </form>
    </div>
</template>

<style scoped lang="scss">
.date-picker {
    border-color: lightgrey;
    font-family: "Helvetica", arial, sans-serif;
    font-size: 18px;
    border: 1px solid #ecf0f1;
    background: #ecf0f1;
    padding: 0.35em;

    &::-webkit-clear-button {
        display: none;
    }

    &::-webkit-inner-spin-button {
        display: none;
    }

    &::-webkit-calendar-picker-indicator {
        color: #2c3e50;
    }

    &,
    focus {
        color: #98a7a8;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
}
</style>