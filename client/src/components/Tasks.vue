<script setup lang="ts">
import { User } from '../models/user';
import { retrieveDate } from '../utils/retrieveDate';
import { Task } from '../models/tasks';


const props = defineProps<{
    tasks: Task[],
    currentTab: string,
    findUser: (id: string) => User,
    deleteTask: (index: number) => void,
    saveTask: (index: number) => void,
}>()




</script>

<template>
    <a class="panel-block" v-for="(task, index) in tasks" :key="index"
        :class="{ 'is-completed': currentTab != 'Completed' && task.isCompleted }">
        <input type="checkbox" v-model="task.isCompleted" @click="saveTask(index)" />
        <div class="task-text">{{ task.title }}</div>
        <div class="task-container">

            <div class="mini-avatar">
                <figure class="image is-32x32">
                    <img :src="findUser(task.assignedTo._id).pic" class="img is-rounded" />
            </figure>
            <p>{{ findUser(task.assignedTo._id).firstName }}</p>
        </div>
        <div class="date">
            <h4>Due Date:</h4>
            {{ retrieveDate(task.dueDate) }}
        </div>
        <div class="delete-button">
            <button class="delete is-large" @click="deleteTask(index)"></button>
        </div>
            </div>
    </a>
</template>

<style scoped lang="scss">
.task-text {
    width: 20em;
}

.date {
    margin-left: auto;
    margin-right: 2em;
    width: 4.5em;
}

.mini-avatar {
    display: flex;
    flex-direction: row;
    margin-right: 1em;
    width: 8em;
}

.task-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.delete-button {
    margin-left: auto;
}
</style>