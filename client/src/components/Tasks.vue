<script setup lang="ts">
import {  useTasks } from '../models/tasks';
import { useUsers } from '../models/user';
import { retrieveDate } from '../utils/retrieveDate';

console.log('test1');

const {findUser} = useUsers();
console.log('test');


const tasks = useTasks()
console.log(tasks.tasks);

</script>

<template>
    <a
        class="panel-block"
        v-for="task in tasks.displayedTasks"
        :key="task._id"
        :class="{ 'is-completed': tasks.currentTab != 'Completed' && task.isCompleted }"
    >
        <input type="checkbox" v-model="task.isCompleted" />
        <div class="task-text">{{ task.title }}</div>
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
    </a>
</template>

<style scoped lang="scss">
.task-text {
    width: 20em;
}
.date {
    margin-left: auto;
    margin-right: 5em;
}
</style>