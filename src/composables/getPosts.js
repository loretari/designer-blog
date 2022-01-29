import { ref } from 'vue/dist/vue'
import { projectFirestore } from "../../../../fashion-designer-blog/fashion-designer-blog/src/firebase/config";
// import { watchEffect } from 'vue'

// const getPosts = (collection, query) => {
//     const documents = ref(null)
//     const error = ref(null)
//
// //    register the firestore collection reference
//     let collectionRef = projectFirestore.collection(collection).orderBy('createdAt')
//
//     if (query) {
//         collectionRef = collectionRef.where(...query)
//     }
//
//     const unsub = collectionRef.onSnapshot((snap) => {
//         console.log('snapshot')
//         let results = []
//         snap.docs.forEach(doc => {
//             // must wait for the server to create the timestamp & send it back
//             // we don't want to edit data until it has done this
//             doc.data().createdAt && results.push({ ...doc.data(), id: doc.id})
//         });
//
//     //    update values
//         documents.value = results;
//         error.value = null;
//     }, err => {
//         console.log(err.message)
//         error.value = 'could not fetch the data'
//         documents.value = null
//     })
//
//     watchEffect((onInvalidate => {
//         // unsub from prev collection when watcher is stopped (component unmounted)
//         onInvalidate(() => unsub())
//     }))
//
//     return {
//         documents,
//         error
//     }
//
// }

const getPosts = () => {
    const posts = ref(null)
    // const posts = ref([])
    const error = ref(null)

    const load = async () => {
        try {

        const res = await projectFirestore.collection('posts').get()
            console.log(res.docs)

            posts.value = res.docs.map(doc => {
                console.log(doc.data())
                return { ...doc.data(), id: doc.id}
            })
        }
    catch (err) {
        error.valu = err.message
        // console.log(error.value)
    }

    }
    return {
        posts,
        error,
        load
    }
}

export default getPosts