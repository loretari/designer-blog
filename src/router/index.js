import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import Details from "../views/Details";
import Create from "../views/Create";
import Tag from "../views/Tag";

//  router guard
import { projectAuth } from "../firebase/config";



const requireAuth = ( to, fro, next ) => {
  let user = projectAuth.currentUser
  if (!user) {
    // next({ name: 'Home' })
    next({ name: 'Login' })
  } else {
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/posts/:id',
    name: 'Details',
   component: Details,
    props: true,
    // beforeEnter: requireAuth
  },
  {
    path: '/posts/create',
    // path: '/create',
    name: 'Create',
    component: Create,
    // beforeEnter: requireAuth
  },
  {
    path: '/tags/:tag',
    name: 'Tag',
    component: Tag
  }




]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
