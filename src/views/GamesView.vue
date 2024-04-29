<template>
    <h1 id="console">{{consoles}}</h1>
    <div class="wrapper">
        <nav>
            <ol class="breadcrumb">
                <li><RouterLink :to="'/categories/'+path[0]">{{path[0]}}</RouterLink></li>
                <li>{{path[1]}}</li>
            </ol>
        </nav>

        <!-- Search -->
        <form class="form">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <input class="input" placeholder="Type your text" required="" type="text">
            <button class="reset" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>

    </div>
    <div id="container">
        <div v-for="game in games" :key="game">{{game.game_name}}</div>
    </div>
</template>

<script>
import { gameService } from "@/services";
export default {
  data() {
    return {
      consoles: this.$route.params.consola,
      category: this.$route.params.category,
      games: null,
      path: this.$route.path,

      search: null
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
            console.log(res.data);
            this.games = res.data
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
  justify-content: space-between;
  width: 95%;
  padding: 1.5rem 3rem;
  border: 1px solid black;
  border-radius: 0.25rem;
}

div.wrapper{
    display: flex;
    justify-content: space-between;
    padding: 0 2.25rem;
}

ol.breadcrumb{
    padding: 0;
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

/* Search */
/* From uiverse.io by @satyamchaudharydev */
/* removing default style of button */

.form button {
  border: none;
  background: none;
  color: #8b8ba7;
  padding: 0 0.30rem 0 0;
}
/* styling of whole input container */
.form {
  --timing: 0.3s;
  --width-of-input: 200px;
  --height-of-input: 1.25rem;
  --border-height: 2px;
  --input-bg: #fff;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg,#fff);
  padding: 0.75rem;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
}
/* styling of Input */
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}
/* styling of animated border */
.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}
/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.form svg {
  width: 17px;
  margin-top: 3px;
}
</style>