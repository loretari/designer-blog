<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="Display name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
    import { ref } from 'vue'
    import useSignup from '../../composables/useSignup'
    import { useRouter } from 'vue-router'

    export default {
        name: "Signup",
        setup() {
            const email = ref('')
            const password = ref('')
            const displayName = ref('')
            const router = useRouter()

            const { error, signup, isPending } = useSignup()

            const handleSubmit = async () => {
                const res = await signup(email.value, password.value, displayName.value)
                if (!error.value) {
                    console.log('user signed up')
                    router.push({ name: 'Home'})
                }
            }


            return{
                email,
                password,
                handleSubmit,
                displayName,
                error,
                isPending


            }
        }

    }
</script>

<style>

</style>