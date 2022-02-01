<template>
    <div class="tag">
        <div v-if="error">{{ error() }}</div>
        <div v-if="posts.length" class="layout">
            <PostList :posts="postsWithTag"/>
            <TagCloud :posts="posts"/>
        </div>
        <div>

        </div>

    </div>
</template>

<script>
    import getPosts from '../composables/getPosts'
    import PostList from "../components/PostList";
    import TagCloud from "../components/TagCloud";
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    export default {
        name: "Tag",
        components: {TagCloud, PostList},

        setup() {
            const { posts, error, load } = getPosts()
            const route = useRoute()

            load()

            const postsWithTag = computed(() => {
                return posts.value.filter((p) => p.tags.includes(route.params.tag))
            })

            return {
                postsWithTag,
                posts,
                error,
            }
        }
    }
</script>

<style>
    .tag {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
    .layout {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 20px;
    }

</style>