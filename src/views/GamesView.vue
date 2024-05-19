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
        <form class="form" onsubmit = "return false">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <input class="input" placeholder="Game Name" type="text" v-model="search">
            <button class="reset" @click="search = ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>

    </div>
    <div id="container">
      <TransitionGroup>
        <div v-for="game in searchList" :key="game" @click="gamePage(game.game_name)">
          <h2>{{game.game_name}}</h2>
          <div class="rating">
            <p>
              <span class="score"><span v-score="game.game_score"></span></span>
            </p>
            <span id="arrow"></span>
          </div>
        </div>
      </TransitionGroup>
    </div>
</template>

<script>
import { gameService } from "@/services";
export default {
  data() {
    return {
      consoles: this.$route.params.consola,
      category: this.$route.params.category,
      path: this.$route.path,
      games: null,

      search:''
    };
  },

  directives:{
    'score':{
      mounted(el, binding){
        const rating = parseFloat(binding.value)
        const starWidth = (el.offsetWidth - 4*5) / 5.0
        const gaps = Math.floor(rating)

        const width = (rating * starWidth) + (4 * gaps)
        el.style.width = `${width}px`
      }
    }
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
            this.games = res.data
          });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    gamePage(game){
      this.$router.push({path: `/game/${game}`})
    },
  },

  mounted() {
    this.getGames(this.$route.params.consola, this.$route.params.category)
    
    this.path = this.path.split('/')
    this.path.shift()
  },

  computed:{
    searchList(){
      if(this.games !== null){
        return this.games.filter(game => game.game_name.toLowerCase().includes(this.search.toLowerCase()))
      }else{
        return this.games
      }
    }
  }
};
</script>

<style scoped>
.v-enter-from{
    transform: translateX(-30%);
}

.v-leave-to{
    transform: translateX(30%);
    opacity: 0;
}


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

#container > div {
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: .75rem 0.75rem .75rem 1.5rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  transition: all 0.3s;
}

#container div:hover{
  background: #CCF2E5;
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;
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

div.wrapper{
    display: flex;
    justify-content: space-between;
    padding: 0 2.25rem;
}

/* Breadcrumb */
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

/* Rating */
.rating{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

/* Arrow */
#arrow{
  background: rgba(0, 0, 0, 0.767);
  clip-path: polygon(0 0, 0 100%, 50% 50%, 0 0);
  padding: 1rem;
  transform: translateY(10%);
}

/* GameScore */
#gameScore h2{
    font-size: 1.8rem;
}

.score {
  margin-bottom: 5px;
  display: inline-block;
  font-size: 2.5rem;
  letter-spacing: 4px;
  color: gray;
  position: relative;
  text-shadow: 0px 0px 4px #FFF;
}

.score::before,
.score span::before {
  content: "★★★★★";
  display: block;
}

.score span {
  color: orange;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
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