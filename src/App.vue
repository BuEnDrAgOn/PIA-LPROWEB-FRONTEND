<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavList from './components/NavList.vue';

</script>

<template>
  <header class="logo">

  </header>

  <aside>
    <nav>
      <ul>
        <NavList link="/home" page="Inicio"/>
        <NavList link="/" page="Perfil"/>
        <li class="list-dropdown">
          Categorías
          <ul class="dropdown">
            <NavList link="/" page="Depende"/>
            <NavList link="/" page="Depende"/>
            <NavList link="/" page="Depende"/>
          </ul>
        </li>
      </ul>
      <ul>
        <NavList link="/" page="Administrador"/>
        <NavList link="/" page="Preguntas Frecuentes"/>
        <NavList link="/" page="Cerrar Sesión"/>
        <NavList link="/" page="Haz tu pregunta"/>
      </ul>
    </nav>
  </aside>
  
  <RouterView />
</template>

<style scoped>
.logo{
  position: fixed;
  width: 100%;
  height: 15%;
  background-color: gray;
}

/* Aside */
aside{
  display: flex;
  position: fixed;
  top: 15%;
  width: 15%;
  background-color: #fff;
  height: 85%;
  border: 1px solid black;
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
}

ul li:first-of-type{
  border-top: 1px solid #d8d8d8;
}

/* Dropdown list */
ul.dropdown{
  position: fixed;
  animation-name: slideOutDown;
  animation-duration: 0.5s;
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
  border: 1px solid #ccc;
  border-radius: 0 1rem 1rem 0;
  animation-name: slideInDown;
  animation-duration: 0.5s;
  visibility: visible;
}

li.list-dropdown{
  padding: 2rem;
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
</style>
