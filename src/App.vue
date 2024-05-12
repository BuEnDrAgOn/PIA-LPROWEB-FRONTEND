<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import NavList from './components/NavList.vue';
import { onMounted, ref } from 'vue'
import HomeView  from './views/HomeView.vue'
import CategoriesViewVue from './views/CategoriesView.vue';
import GamesViewVue from './views/GamesView.vue';
import { consoleService } from '@/services/index.js'
import GameCRUDView from './views/admin/GameCRUDView.vue'
import ConsolesCRUDViewVue from './views/admin/ConsolesCRUDView.vue';

const displayNavChecked = ref(true);
const consoles = ref([])
const router = useRouter()

const consoleCategory = (e) =>{
  const consola = e.target.innerText
  router.push({path: `/categories/${consola}`})
}

onMounted(() =>{
  new Promise((response, reject) =>{
    consoleService.getConsoles().then(response =>{
      consoles.value = response.data
    })
  })
  
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
        <NavList link="/" page="Inicio"/>
        <NavList link="/" page="Perfil"/>

        <li class="list-dropdown">
          Consolas
         <ul  class="dropdown">
            <NavList v-for="console in consoles" :key="console" link="/categories" :page="console.console" @click="consoleCategory($event)"/>
          </ul>
        </li>

      </ul>

      <ul>
        <li class="list-dropdown">
          Administrador
         <ul  class="dropdown">
            <NavList link="/admin/games" page="Games"/>
            <NavList link="/admin/consoles" page="Consoles"/>
          </ul>
        </li>
        <NavList link="/" page="Preguntas Frecuentes"/>
        <NavList link="/" page="Cerrar Sesión"/>
        <NavList link="/" page="Haz tu pregunta"/>
      </ul>

    </nav>
  </aside>

  <main>
    <RouterView/>
  </main>

</template>

<style scoped>
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
}

/* Main */
main{
  display: flex;
  flex-flow: wrap column;
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
  top: 15%;
  width: 15%;
  background-color: #fff;
  min-height: 85%;
  /* border: 1px solid #d8d8d8; */
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1), 0px 17px 24px rgba(0, 0, 0, 0.07);
  z-index: 2;
  transition: all 0.3s;
}

/* Navbar */
nav{
  display: flex;
  flex-flow: wrap column;
  justify-content: space-between;
  width: 100%;
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
}

ul li:first-of-type{
  border-top: 1px solid #d8d8d8;
}

/* Dropdown list */
ul.dropdown{
  position: fixed;
  border: 1px solid #d8d8d8;
  border-radius: 0 1rem 1rem 0;
  background: white;
  animation-name: slideOutDown;
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(1,-1.16,.59,.72);
  visibility: hidden;
  left: 15%;
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
  flex-flow: wrap column;
  left: 15%;
  margin-top: -2rem;
  animation-name: slideInDown;
  animation-timing-function: linear;
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(.13,1.1,.69,1.55);
  visibility: visible;
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
    position: relative;
    min-height: calc(85vh - 3rem - 6px);
    height: initial;
    top: 0;
    width: 100%;
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
