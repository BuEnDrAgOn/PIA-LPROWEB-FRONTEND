<template>
    <h1 id="console">{{consoles}}</h1>
    <div class="wrapper">
        <nav>
            <ol class="breadcrumb">
                <li><RouterLink :to="'/categories/'+path[0]">{{path[0]}}</RouterLink></li>
                <li>{{path[1]}}</li>
            </ol>
        </nav>
    </div>
    <div id="container"></div>
</template>

<script>
import { gameService } from "@/services";
export default {
  data() {
    return {
      consoles: this.$route.params.consola,
      category: this.$route.params.category,
      games: null,
      path: this.$route.path
    };
  },

  methods: {
    async getGames(consola, categoria) {
      this.loading = true;
      try {
        await gameService
          .getConsoleCategoryGames({
            consola: consola,
            category: categoria,
          })
          .then((res) => {
            // console.log(res.data);
          });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getGames(this.$route.params.consola, this.$route.params.category)
    this.path = this.path.split('/')
    this.path.shift()
    console.log(this.path)
  },
};
</script>

<style scoped>
#console{
    display: flex;
    width: 25%;
    padding: 2rem;
    margin: 1rem;
    border: 1px solid;
    font-size: 3rem;
    justify-content: center;
}

#container {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 0;
  height: 72%;
  margin-top: 1rem;
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

div.wrapper{
    display: flex;
}

ol.breadcrumb{
    display: flex;
    gap: 1rem;
    list-style: none;
    font-size: 1rem;
}

ol.breadcrumb li {
    font-style: italic;
    text-transform: capitalize;
}

ol.breadcrumb li + li::before{
    padding-right: 0.5rem;
    color: black;
    content: ">> ";
}

a:hover{
    background: none;
    transform: scale(1.2,1.2);
}
</style>