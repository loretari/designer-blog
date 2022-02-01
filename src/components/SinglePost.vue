<template>
    <div class="post">
        <router-link :to="{ name: 'Details', params: { id: post.id }}">
            <h3>{{ post.title }}</h3>
        </router-link>
        <p>Created by {{ post.userName }}</p>

        <div class="cover">
            <router-link :to="{ name: 'Details', params: { id: post.id }}">
                <img :src="post.coverUrl">
            </router-link>

        </div>

        <p>{{ snippet }}</p>
        <span v-for="tag in post.tags" :key="tag"># {{ tag }}</span>
    </div>
</template>


<script>
    import { computed } from 'vue'

    export default {
        name: "SinglePost",
        props: ['post'],
        setup(props) {
            const snippet = computed(() => {
                return props.post.body.substring(0, 100) + '...'
            })
            return {
                snippet
            }
        }
    }
</script>

<style scoped>

</style>