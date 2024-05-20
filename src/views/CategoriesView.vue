<template>
  <h1>Categorias</h1>

  <div id="container">
    <div v-for="category in categories" :key="category" @click="categoryPage(category.category)">{{ category.category }}</div>
    
  </div>
</template>

<script>
import { categoriesService } from '@/services';
export default {
  data() {
    return {
      categories: [],
      consoles: null,
    };
  },

  methods:{
    categoryPage(category){
      let path = this.$route.path
      path = path.split('/')
      if(this.consoles == null){
        this.consoles = path[2]
      }
      this.$router.push({path: `/${this.consoles}/${category}`})
    }

  },

  watch: {
    '$route.params.consola'(newConsole, oldConsole){
      if (newConsole !== undefined){
        this.consoles = newConsole
      }
    }
  },
  mounted(){
    categoriesService.getAllCategories().then((response) => {
      const {data} = response
      this.categories = data
    })
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
  transition: 0.3s all;
}

#container div:hover{
  background: #CCF2E5;
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;
}

h1 {
  padding-left: 2rem;
  font-style: italic;
  height: 7%;
}

@keyframes cursor {
  0%{
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  }
  33.33%{
    cursor: url('@/assets/cursors/frames/frame2.gif'), auto;
  }
  66.66%{
    cursor: url('@/assets/cursors/frames/frame3.gif'), auto;
  }
  100%{
    cursor: url('@/assets/cursors/frames/frame4.gif'), auto;
  }
}

@media (max-width: 600px){
  #container  div{
    font-size: 1rem;
  }

  #container{
    max-height: 70vh;
  }

  #arrow{
    padding: 0.5rem;
  }

  #console{
    display: none;
  }

  div.wrapper{
    padding: 0;
  }
}
</style>