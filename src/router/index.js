import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import GamesView from '../views/GamesView.vue'
import GameInfoView from '../views/GameInfoView.vue'
import GameCRUDView from '../views/admin/GameCRUDView.vue'
import consolesCRUD from '../views/admin/ConsolesCRUDView.vue'
import categoriesCRUD from '../views/admin/CategoriesCRUDView.vue'

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

    // ADMIN

    {
      path:"/admin/games",
      name: "gameCRUD",
      component: GameCRUDView,
      meta: {requiresAuth: true}
    },
    {
      path: "/admin/consoles",
      name: "consolesCRUD",
      component: consolesCRUD,
      meta: {requiresAuth: true}
    },
    {
      path: "/admin/categories",
      name: "categoriesCRUD",
      component: categoriesCRUD,
      meta: {requiresAuth: true}
    }
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
