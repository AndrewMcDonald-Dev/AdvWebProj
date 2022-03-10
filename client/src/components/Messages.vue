<script setup lang="ts">
import { ref } from 'vue';
import { useMessages } from '../models/messages';
import { list, findUser } from '../models/user';

</script>

<template>
    <div class="tabs is-boxed">
        <ul>
            <li
                :class="{ 'is-active': useMessages().currentTab == 'Created' }"
                @click="useMessages().changeTab('Created')"
            >
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-clipboard-list"></i>
                    </span>
                    <span>Created</span>
                </a>
            </li>
            <li
                :class="{ 'is-active': useMessages().currentTab == 'Assigned' }"
                @click="useMessages().changeTab('Assigned')"
            >
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-calendar-times"></i>
                    </span>
                    <span>Assigned</span>
                </a>
            </li>
            <li
                :class="{ 'is-active': useMessages().currentTab == 'Upcoming' }"
                @click="useMessages().changeTab('Upcoming')"
            >
                <a>
                    <span class="icon is-small">
                        <i class="fas fa-calendar-day"></i>
                    </span>
                    <span>Upcoming</span>
                </a>
            </li>
            <li
                :class="{ 'is-active': useMessages().currentTab == 'All' }"
                @click="useMessages().changeTab('All')"
            >
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
        <form @submit.prevent="useMessages().addTask" style="flex-grow: 1">
            <div class="columns">
                <div class="field has-addons column is-8">
                    <div class="control has-icons-left">
                        <input
                            class="input is-primary"
                            type="text"
                            placeholder="New Task"
                            v-model="useMessages().newTask"
                            maxlength="35"
                        />
                        <span class="icon is-left">
                            <i class="fas fa-calendar-plus" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="control">
                        <button class="button is-primary">Add</button>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger">
                            <button
                                class="button"
                                aria-haspopup="true"
                                aria-controls="dropdown-menu4"
                            >
                                <span>{{ useMessages().toBeAssigned ? findUser(useMessages().toBeAssigned).firstName : 'Worker' }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                            <div class="dropdown-content">
                                <a
                                    class="dropdown-item mini-avatar"
                                    v-for="user in list"
                                    @click="useMessages().changeToBeAssigned(user.id)"
                                >
                                    <figure class="image is-32x32">
                                        <img :src="user.pic" class="img is-rounded" />
                                    </figure>
                                    <p>{{ user.firstName }}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <a
        class="panel-block"
        v-for="task in useMessages().displayedTasks()"
        :key="task.title"
        :class="{ 'is-completed': useMessages().currentTab != 'Completed' && task.isCompleted }"
    >
        <input type="checkbox" v-model="task.isCompleted" />
        <div class="task-text">{{ task.title }}</div>
        <div class="right mini-avatar">
            <figure class="image is-32x32">
                <img :src="findUser(task.assignedTo).pic" class="img is-rounded" />
            </figure>
            <p>{{ findUser(task.assignedTo).firstName }}</p>
        </div>
    </a>
</template>

<style scoped lang="scss">
.mini-avatar {
    display: flex;
    flex-direction: row;
    margin-right: 0em;
    padding-right: 1em;

    figure,
    p {
        margin: 0.3em;
    }

    p {
        margin-top: 0.7em;
    }
}
.task-text {
    width: 20em;
}
</style>