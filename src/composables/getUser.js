import { projectAuth } from "../../../../fashion-designer-blog/fashion-designer-blog/src/firebase/config";
import { ref } from 'vue/dist/vue'

// refs
const user = ref(projectAuth.currentUser)

// auth changes
projectAuth.onAuthStateChanged(_user => {
    console.log('User state change. Current user is:', _user)
    user.value = _user
})

const getUser = () => {
    return {
        user
    }
}
export default getUser
