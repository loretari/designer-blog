import { ref } from 'vue/dist/vue'
import { projectFirestore } from '../../../../fashion-designer-blog/fashion-designer-blog/src/firebase/config'
import useCollection from "./useCollection";

const getPost = (id) => {


    const post = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let res = await projectFirestore.collection('posts').doc(id).get()
            // console.log(res)
            // console.log(res.data)

            if (!res.exists) {
                throw Error('That post does not exist')
            }
            post.value = { ...res.data(), id: res.id }
            console.log(post.value)
        }
        catch(err) {
            error.value = err.message
        }
    }

    return { post, error, load }
}

export default getPost



