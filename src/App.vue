<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import NavList from './components/NavList.vue';
import { onMounted, ref } from 'vue'
import HomeView  from './views/HomeView.vue'
import CategoriesViewVue from './views/CategoriesView.vue';
import GamesViewVue from './views/GamesView.vue';
import { consoleService } from '@/services/index.js'
import GameCRUDView from './views/admin/GameCRUDView.vue'
import ConsolesCRUDView from './views/admin/ConsolesCRUDView.vue';
import FAQCRUDView from './views/FaqView.vue';
import CategoriesCRUDViewVue from './views/admin/CategoriesCRUDView.vue';
import SesionComponentVue from './components/SesionComponent.vue';
import QuestionModalComponentVue from './components/QuestionModalComponentVue.vue';
import FaqUsersViewVue from './views/admin/FaqUsersView.vue';
import { jwtDecode } from 'jwt-decode';

const displayNavChecked = ref(true);
const router = useRouter()

const consoles = ref([])
const consoleCategory = (e) =>{
  const consola = e.target.innerText
  router.push({path: `/categories/${consola}`})
}


const admin = ref(false)
const user = ref(false)
const profile = ref('Perfil')

const reportQuestion = ref(null)
const sesionComponent = ref(null)

const questionModal = () =>{
  if(localStorage.getItem('token')){
    reportQuestion.value.visible = true
  } else{
    sesionComponent.value.visible = true
  }
}

const loginUser = (role) =>{
  if(role){
    admin.value = true;
  }
  if(localStorage.getItem('token')){
    const payload = jwtDecode(localStorage.getItem('token'))
    if(payload.roles.role_name === 'admin'){
      admin.value = true
    }
    user.value = true;
    profile.value = payload.user_name.toUpperCase()
  }
}

const logOut = () =>{
  localStorage.removeItem('token')
  admin.value = false
  user.value = false

}

onMounted(() =>{
  new Promise((response, reject) =>{
    consoleService.getConsoles().then(response =>{
      consoles.value = response.data
    })
  })
  
  if(localStorage.getItem('token')){
    const payload = jwtDecode(localStorage.getItem('token'))
    if(payload.roles.role_name === 'admin'){
      admin.value = true
    }
    user.value = true;
    profile.value = payload.user_name
  }
})
</script>

<template>
  <header class="logo">

  </header>
  <div class="mobile-nav">
    <input type="checkbox" id="displayNav" v-model="displayNavChecked">
    <label for="displayNav">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 2 9 L 2 11 L 48 11 L 48 9 L 2 9 z M 2 24 L 2 26 L 48 26 L 48 24 L 2 24 z M 2 39 L 2 41 L 48 41 L 48 39 L 2 39 z"></path>
      </svg>
    </label>
  </div>

  <aside id="aside" :style="[displayNavChecked ? {'left': '0'} : {'left': '-30%'}]">
    <nav>
      <ul>
        <NavList link="/" page="Start"/>
        <li class="list-dropdown" @click="$refs.sesionComponent.visible = true" v-if="!user">Login</li>
        <NavList link="/character" :page="profile" v-else/>

        <li class="list-dropdown">
          Consoles
         <ul  class="dropdown">
            <NavList v-for="console in consoles" :key="console" link="/categories" :page="console.console" @click="consoleCategory($event)"/>
          </ul>
        </li>

      </ul>

      <ul>
        <li class="list-dropdown" v-if="admin">
          SETTINGS 
         <ul  class="dropdown">
            <NavList link="/admin/games" page="Games"/>
            <NavList link="/admin/consoles" page="Consoles"/>
            <NavList link="/admin/categories" page="Categories"/>
            <NavList link="/admin/faq" page="FAQ"/>
            <NavList link="/admin/reports" page="Reports"/>
          </ul>
        </li>
        <NavList link="/faq" page="FAQ"/>
        <NavList link="/" page="Logout" @click="logOut"/>
        <li class="green" style="padding: 2rem 0;" @click="questionModal()">Report a Question</li>
      </ul>

    </nav>
  </aside>

  <main>
    <RouterView @open-modal="$refs.sesionComponent.visible = true"/>
  </main>

  <SesionComponentVue ref="sesionComponent" @admin="loginUser"/>
  <QuestionModalComponentVue ref="reportQuestion"/>

</template>

<style scoped>

@font-face {
  font-family: gamesMenu;
  src: url(@/assets/fonts/PixelDigivolveItalic-dV8R.ttf);
}
/* Wrapper */
#wrapper{
  display: flex;
}
/* Header */
.logo{
  position: fixed;
  width: 100%;
  height: 15%;
  background-color: gray;
  z-index: 2;
  background: url(@/assets/img/header.png);
}

/* Main */
main{
  display: flex;
  flex-flow: column;
  position: absolute;
  padding: 1rem;
  right: 0;
  top: 15%;
  width: 85%;
  height: 85%;
  z-index: 1;
}

/* Aside */
aside{
  display: flex;
  position: fixed;
  text-transform: uppercase;
  top: 15%;
  width: 15%;
  background-color: #fff;
  min-height: 85%;
  /* border: 1px solid #d8d8d8; */
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1), 0px 17px 24px rgba(0, 0, 0, 0.07);
  z-index: 2;
  transition: all 0.3s;
  font-family: gamesMenu;
}


/* Navbar */
nav{
  display: flex;
  flex-flow: wrap column;
  justify-content: space-between;
  width: 100%;
  background: #d8d8d8;
}
ul{
  display: flex;
  flex-flow: wrap column;
  padding: 0;
}
ul li{
  text-align: center;
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  flex-grow: 1;
  background: white;
}

ul li:first-of-type{
  border-top: 1px solid #d8d8d8;
}

/* Dropdown list */
ul.dropdown{
  flex-flow: column;
  position: fixed;
  border: 1px solid #d8d8d8;
  background: white;
  animation-name: slideOutDown;
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(1,-1.16,.59,.72);
  visibility: hidden;
  left: 15%;
  max-height: 268px;
  text-transform: initial;
}

ul.dropdown::-webkit-scrollbar {
  position: absolute;
  right: 0;
  width: 10px;
  background-color: #f1f1f1;
  border-radius: 20px;
}

ul.dropdown::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #333;
}

ul.dropdown::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

li.list-dropdown{
  transition: all 0.5s;
}
li.list-dropdown:hover{
  background: #e8e8e8;
}
li.list-dropdown:hover > ul.dropdown{
  display: flex;
  position: fixed;
  flex-flow: column;
  left: 15%;
  margin-top: -2rem;
  animation-name: slideInDown;
  animation-timing-function: linear;
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(.13,1.1,.69,1.55);
  visibility: visible;
  overflow: auto;
}

li.list-dropdown{
  padding: 2rem 0;
}

/* Mobile nav */
.mobile-nav{
  display: none;
}

.mobile-nav label{
  line-height: 0;
  transition: all 0.3s;
}

#displayNav{
  display: none;
}

#displayNav:checked ~ label{
  transform: translateX(30vw);
}


/* Animations */

@keyframes slideInDown {
    0% {
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0);
        visibility: visible;
        opacity: 0;
    }

    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 100%;
    }
}
@keyframes slideOutDown {
    0% {
        -webkit-transform: translate3d(0,0%,0);
        transform: translate3d(0,0%,0);
        opacity: 100%;
        pointer-events: none;
    }

    to {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
    }
}

/* Responsive */
@media (max-width: 716px){
  .logo{
    position: relative;
    background-size: 1600px 130px;
    background-position: 26% 50%;
  }

  aside{
    top: 0;
    min-height: 100%;
    width: 30%;
  }

  aside ul:first-of-type > li:first-of-type{
    border-top: 0;
  }

  main{
    display: flex;
    min-height: calc(85vh - 3rem - 6px);
    height: initial;
    top: 20%;
    width: 100%;
  }

  ul.dropdown li{
    width: 200px;
  }

  .mobile-nav{
    display: flex;
    padding: 1rem;
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
  }

  li.list-dropdown:hover > ul.dropdown{
    left:30%;
  }
  ul.dropdown{
    left:30%;
  }
}
</style>
