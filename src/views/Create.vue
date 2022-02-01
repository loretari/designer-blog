<template>
    <div class="create">
        <form @submit.prevent="handleSubmit">
            <label>Title:</label>
            <input v-model="title" type="text" required>
            <label>Content</label>
            <textarea v-model="body" required></textarea>
            <!--   upload image           -->
            <label>Upload image</label>
            <input type="file" @change="handleChange">
            <div class="error">{{ fileError }}</div>
            <label>Tags (hit enter to add tag)</label>
            <input
                    v-model="tag"
                    type="text"
                    @keydown.enter.prevent="handleKeydown"
            >
            <div v-for="tag in tags" :key="tag" class="pill">
                #{{ tag }}
            </div>
            <button v-if="!isPending" class="add">Add Post</button>
            <button v-else disabled class="add">Saving...</button>


        </form>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import useCollection from '../composables/useCollection'
    import getUser from '../composables/getUser'
    import { timestamp } from "../firebase/config";
    import useStorage from '../composables/useStorage'

    export default {
        name: "Create",
        setup() {
            const { user } =getUser()
            const {addDoc, error} = useCollection('posts')
            const {url, filePath, uploadImage,} = useStorage()

            const title = ref('')
            const body = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const isPending = ref(false)

            const tag = ref('')
            const tags = ref([])


            const router = useRouter()
            console.log(router)

            const handleKeydown = () => {
                if (!tags.value.includes(tag.value)) {
                    tag.value = tag.value.replace(/\s/g, '') // remove all whitespace
                    tags.value.push(tag.value)
                }
                tag.value = ''


            }

            const handleSubmit = async () => {
                if (file.value) {
                    console.log(title.value, body.value, file.value)
                    isPending.value = true
                    await uploadImage(file.value)
                    console.log('image uploaded, url: ', url.value)
                    const post = await addDoc({
                        title: title.value,
                        body: body.value,
                        tags: tags.value,
                        userId: user.value.uid,
                        userName: user.value.displayName,
                        coverUrl: url.value,
                        filePath: filePath.value,
                        posts: [],
                        createdAt: timestamp
                    })
                    isPending.value = false
                    if (!error.value) {
                        router.push({name: 'Home', params: {id: post.id}})
                    }
                }

            }

            // allowed file types
            const types = ['image/png', 'image/jpeg']

            const handleChange = (e) => {
                const selected = e.target.files[0]
                console.log(selected)

                if (selected && types.includes(selected.type)) {
                    file.value = selected
                    fileError.value = null
                } else {
                    file.value = null
                    fileError.value = 'Please select an images file (png or jpg)'
                }
            }

            return {
                title,
                body,
                tags,
                tag,
                handleKeydown,
                handleSubmit,
                handleChange,
                fileError,
                isPending
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
    .add {
        display: block;
        margin-top: 30px;
        background: #5F4B66;
        color: white;
        padding: 8px 16px;
        font-size: 18px;
    }
    .pill {
        display: inline-block;
        margin: 10px 10px 0 0;
        color: #444;
        background: #ddd;
        padding: 8px;
        border-radius: 20px;
        font-size: 14px;
    }
</style>