import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import GamesView from '../views/GamesView.vue'
import GameInfoView from '../views/GameInfoView.vue'
import GameCRUDView from '../views/admin/GameCRUDView.vue'
import ConsolesCRUD from '../views/admin/ConsolesCRUDView.vue'
import CategoriesCRUD from '../views/admin/CategoriesCRUDView.vue'
import ProfileView from '../views/ProfileView'
import FaqView from '../views/FaqView.vue'
import FaqUsers from '../views/admin/FaqUsersView.vue'

import { jwtDecode } from 'jwt-decode'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/character',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      children: [
        {
          path: "/categories/:consola",
          name: 'categories',
          component: CategoriesView,
        }
      ]
    },
    {
      path: '/:consola/:category',
      name: 'games',
      component: GamesView
    },
    {
      path:"/game/:game",
      name: 'gameInfo',
      component: GameInfoView
    },
    {
      path: "/faq",
      name: 'FaqView',
      component: FaqView
    },

    // ADMIN

    {
      path:"/admin/games",
      name: "gameCRUD",
      component: GameCRUDView,
      meta: {requiresAuth: true}
    },
    {
      path: "/admin/consoles",
      name: "ConsolesCRUD",
      component: ConsolesCRUD,
      meta: {requiresAuth: true}
    },
    {
      path: "/admin/categories",
      name: "CategoriesCRUD",
      component: CategoriesCRUD,
      meta: {requiresAuth: true}
    },
    {
      path: "/admin/faq",
      name: "FaqUsers",
      component: FaqUsers,
      meta: {requiresAuth: true}
    },
    // {
    //   path: '/admin/faq',
    //   name: 'FaqCRUD',
    //   component: FaqCRUD,
    //   meta: {requiresAuth: true}
    // },

    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) =>{
  if(to.meta.requiresAuth){
    const token = localStorage.getItem('token');
    if(!token){
      next('/')
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.roles.role_name === 'admin'){
          next()
        } else{
          next('/')
        }
      } catch(e){
        console.error('Error al decodificar el token: ', error)
        next('/')
      }
    }
  }else{
    next()
  }
})

export default router
