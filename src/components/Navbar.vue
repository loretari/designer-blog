<template>
    <header>
        <router-link :to="{ name: 'Home' }">
            <h1>The fashion Designer Blog</h1>
        </router-link>
        <nav>
            <div class="links">
                <div  v-if="user">
                    <router-link :to="{ name: 'Home' }">Home</router-link>
<!--                    <router-link :to="{ name: 'Create' }">Create Post</router-link>-->
<!--                    <span>Hi here, {{ user.displayName }}</span>-->
                    <button @click="handleClick">Logout</button>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                    <router-link :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </div>

            </div>

        </nav>
    </header>
</template>

<script>
    import getUser from '../composables/getUser'
    import useLogout from '../composables/useLogout'
    import { useRouter } from 'vue-router'

    export default {
        name: "Navbar",
        setup() {
            const { user } = getUser()
            const { logout } = useLogout()
            const router = useRouter()

            const handleClick = async () => {
                await logout()
                console.log('loged out')
                // router.push({ name: 'Home' })
                router.push({ name: 'Login' })
            }

            return {
                user,
                handleClick
            }
        }
    }
</script>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
    header h1 {
        color: #dfdfdf;
        font-size: 48px;
    }
    header a {
        color: #bbb;
        text-decoration: none;
        margin-left: 20px;
    }
    header a.router-link-active {
        color: #444;
        font-weight: bold;
    }

    nav .links {
        margin-left: auto;
        display: flex;
    }
    span {
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #ee77ee;
    }
    button {
        margin-left: 16px;
        background: #5F4B66;
        color: white;
        padding: 8px 16px;
        font-size: 18px;
        cursor: pointer;
    }

</style>