import {ref } from 'vue/dist/vue'
import { projectFirestore } from "../../../../fashion-designer-blog/fashion-designer-blog/src/firebase/config";

const useDocument = (collection, id) => {

    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
    isPending.value = true
        error.value = null
        try {
            const res = await docRef.delete()
            isPending.value = false
            error.value = null
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'could not delete the document'
        }
    }



    return {
        isPending,
        error,
        deleteDoc
    }
}


export default useDocument