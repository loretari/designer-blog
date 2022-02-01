<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts"/>
      <TagCloud :posts="posts"/>

    </div>
    <div v-else>Loading...</div>

  </div>
</template>

<script>
  import PostList from "../components/PostList";
  import getPosts from "../composables/getPosts";
  import TagCloud from "../components/TagCloud";

  export default {
    name: 'Home',
    components: {TagCloud, PostList},

    setup() {
      const { posts, error, load } = getPosts(
              'posts',
      )

      console.log(posts)
      load()

      return {
        posts,
        error,
      }
    }


  }
</script>
<style>
  .home {
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
