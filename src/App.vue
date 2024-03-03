<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="logo">

  </header>

  <aside>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
  
  <RouterView />
</template>

<style scoped>
.logo{
  width: 100%;
  height: 15%;
  background-color: gray;
}

/* Aside */
aside{
  display: flex;
  width: 15%;
  background-color: #ccc;
  height: 80%;
}

</style>
