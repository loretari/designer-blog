<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="post" class="post">
        <h3>{{ post.title }}</h3>
        <p>Created by {{ post.userName }}</p>
        <div class="img">
            <img :src="post.coverUrl">
        </div>
        <p class="pre">{{ post.body }}</p>
        <button @click="handleClick(post.id)" v-if="ownerShip" class="delete">Delete post</button>
    </div>
</template>

<script>
    import useDocument from '../composables/useDocument'
    import useStorage from '../composables/useStorage'
    import getUser from '../composables/getUser'
    import getPost from '../composables/getPost'
    import { useRouter, useRoute } from 'vue-router'
    import { computed } from 'vue'

    export default {
        name: "Details",
        props: ['id'],
        setup(props) {
            const route = useRoute()

            const { deleteImage } = useStorage()
            const { deleteDoc } = useDocument('posts', props.id)
            const { error, post, load } = getPost(route.params.id)
            const { user } = getUser()
            const router = useRouter()

            const ownerShip = computed(() => {
                return post.value && user.value && user.value.uid == post.value.userId
            })


            load()

            const handleClick = async () => {
                await deleteDoc()
                await deleteImage(post.value.filePath)

                router.push({ name: 'Home' })
            }



            return {
                handleClick,
                post,
                error,
                ownerShip
            }


        },
    }
</script>

<style>
    .post {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 40px;
    }
    .post p {
        color: #444;
        line-height: 1.5em;
        line-height: 1.5em;
        margin-top: 20px;
    }
    .pre {
        white-space: pre-wrap;
    }
    button.delete {
        margin: 10px auto;
    }
    img {
        margin-top: 20px;
        border-radius: 20px;
        top: 0;
        left: 0;
        min-width: 70%;
        min-height: 70%;
        max-width: 70%;
        max-height: 70%;

    }
</style>