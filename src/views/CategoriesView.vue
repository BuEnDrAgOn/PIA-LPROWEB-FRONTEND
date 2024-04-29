<template>
  <h1>Categorias</h1>

  <div id="container">
    <div v-for="categorie in categories" :key="categorie">{{ categorie }}</div>
    
  </div>
</template>

<script>
import { consoleService } from '@/services';
export default {
  data() {
    return {
      categories: ['RPG', 'MMO', 'Aventura', 'Hack and Slash'],
      consoles: null,
      path: null,
      loading: false
    };
  },

  methods:{
    async getGames(consola){
      this.loading = true
      try{
        await consoleService.getConsoles().then((res, rej)=>{
          this.consoles = res.data
        })
      } catch(e){
        console.log(e)
      } finally{
        this.loading = false
      }
    }
  },

  watch: {
    '$route.params.consola'(newConsole, oldConsole){
      this.getGames(newConsole).then(()=>{
        console.log(this.consoles[1].console)
      })
    }
  }
};
</script>

<style scoped>
#container {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 0;
  height: 93%;
  width: 100%;
  /* flex-grow: 1; */
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  border-radius: 10px;
  overflow-y: auto;
  gap: 3rem;
}

#container::-webkit-scrollbar {
  position: absolute;
  right: 0;
  width: 10px;
  background-color: #f1f1f1;
  border-radius: 20px;
}

#container::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #333;
}

#container::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

#container div {
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  width: 80%;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
}

h1 {
  padding-left: 2rem;
  font-style: italic;
  height: 7%;
}
</style>