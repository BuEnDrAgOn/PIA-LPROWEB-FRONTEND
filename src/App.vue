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
        <NavList link="/" page="Inicio"/>
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
  background-color: #ccc;
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
}

ul li:nth-child(odd){
  background-color: white;
}

/* Dropdown list */
ul.dropdown{
  display: none;
}
li.list-dropdown:hover > ul.dropdown{
  display: flex;
  position: fixed;
  flex-flow: wrap column;
  left: 15%;
  margin-top: -2rem;
  border: 1px solid #ccc;
  border-radius: 0 1rem 1rem 0;
}
ul.dropdown li{
  background-color: transparent;
  width: 15vw;
}

li.list-dropdown{
  padding: 2rem;
}

</style>
