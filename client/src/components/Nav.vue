<script setup lang="ts">
import { ref } from 'vue';
import LoginBadge from './LoginBadge.vue';
import Notfications from './Notfications.vue';

const isOpen = ref(false)
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a>
                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    :class="{ 'is-active': isOpen }"
                    @click="isOpen = !isOpen"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" :class="{ 'is-active': isOpen }">
                <div class="navbar-start">
                    <router-link class="navbar-item" to="/">Home</router-link>
                    <router-link class="navbar-item" to="/wall">Wall</router-link>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">More</a>
                        <div class="navbar-dropdown">
                            <router-link class="navbar-item" to="/about">About</router-link>
                            <router-link class="navbar-item" to="/jobs">Jobs</router-link>
                            <router-link class="navbar-item" to="/contact">Contact</router-link>
                            <hr class="navbar-divider" />
                            <router-link class="navbar-item" to="/issue">Report an issue</router-link>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <LoginBadge/>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
</style>