<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading</button>

    </form>
</template>

<script>
    import useLogin from '../../composables/useLogin'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    export default {
        name: "Login",
        setup() {

            const email = ref('')
            const password = ref('')
            const router = useRouter()

            const { error, login, isPending } = useLogin()

            const handleSubmit = async () => {
                const res = await login(email.value, password.value)
                if (!error.value) {
                    console.log('user logged')
                    router.push({ name: 'Home' })
                }

            }
            return {
                handleSubmit,
                email,
                password,
                isPending,
                login,
                error
            }
        }
    }
</script>

<style>
    form {
        max-width: 480px;
        margin: 0 auto;
        text-align: left;

    }
    input, textarea {
        display: block;
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #eee;
    }
    textarea {
        height: 160px;
    }
    label {
        display: inline-block;
        margin-top: 30px;
        position: relative;
        font-size: 20px;
        color: white;
        margin-bottom: 10px;
    }
    label::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #5F4B66;
        position: absolute;
        z-index: -1;
        padding-right: 40px;
        left: -30px;
        transform: rotateZ(-1.5deg);
    }


</style>