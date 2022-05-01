import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useSession } from '../models/session';
import jwt from 'jsonwebtoken';
import Generic from '../pages/Generic.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
// import Messages from "../pages/Messages.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/about', component: Generic, props: { title: 'About Page' } },
    { path: '/contact', component: Generic, props: { title: 'Contact Page' } },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/wall', component: () => import('../pages/Wall.vue') },
    { path: '/jobs', component: Generic, props: { title: 'Jobs page' } },
    { path: '/issue', component: Generic, props: { title: 'Issue Page' } },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    linkActiveClass: 'is-active',
});

router.beforeEach(async (to, from) => {
    const session = useSession();

    if (!session.user) {
        const userToken = localStorage.getItem('user');
        if (userToken) {
            await session.LoginByToken(userToken);
        }
    }
    if (session.destinationUrl == null && to.path != '/login')
        session.destinationUrl = to.path;

    const protectedUrls = ['/messages', '/wall', '/feed', '/hidden'];

    if (protectedUrls.includes(to.path.toLowerCase())) {
        // list of paths that require login
        if (!session.user) return '/login';
    }
});
