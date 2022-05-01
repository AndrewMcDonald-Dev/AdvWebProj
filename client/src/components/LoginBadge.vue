<script setup lang="ts">
import {useSession} from '../models/session';
const {Logout, user} = useSession();



</script>

<template>
    <div class="buttons" v-if="!user">
        <router-link class="button is-light" to="/login">Log in</router-link>
        <router-link class="button is-primary" to="/signup">
            <strong>Sign up</strong>
        </router-link>
    </div>
    <div class="buttons" v-else>
        <div class="avatar">
            <div class="avatar-image">
                <figure class="image is-64x64">
                    <img :src="user.pic" class="img is-rounded" />
                </figure>
            </div>
            <div class="login-tag">
                <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                <i>{{ user.email }}</i>
            </div>
        </div>
        <a class="button is-primary" @click="Logout">
            <strong>Log Out</strong>
        </a>
    </div>
</template>

<style scoped lang="scss">
.login-tag {
    display: flex;
    flex-direction: column;
}

.avatar {
    display: flex;
    flex-direction: row;
    margin-right: 1em;
}

.img {
    max-height: 5em;
}

.avatar-image {
    margin: 0.4em;
    margin-top: 0em;
}
</style>
