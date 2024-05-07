<template>
    <h1>CRUD JUEGOS</h1>
    <div class="wrapper">
        <!-- Search -->
        <form class="form" onsubmit = "return false">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <input class="input" placeholder="Nombre del juego" type="text" v-model="search">
            <button class="reset" @click="search = ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>

    </div>
    <div id="container">
        <table>
            <tbody>
                <thead>
                    <tr>
                        <th>Juego</th>
                        <th>Consolas</th>
                        <th>Categorías</th>
                        <th>Banner</th>
                    </tr>
                </thead>
                <tr v-for="game in searchList" :key="game">
                    <td>
                        <input type="text" v-model='game.game_Name'>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { gameService } from '@/services'
export default {
    data(){
        return{
            games: null,
            search: ''
        }
    },
    methods:{
        async getGames(){
            await gameService.getAllGames().then((response) =>{
                this.games = response.data
            })
        }
    },

    mounted(){
        this.getGames().then(() =>{
            console.log(this.games)
        })
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
}

</script>

<style scoped>
#container{
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-block-start: 1rem;
    padding: 3rem 1.5rem;
    height: 85%;
    width: 100%;
    flex-grow: 1;
    box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);
    border-radius: 10px;
    overflow-y: auto;
    gap: 3rem;
}

#container::-webkit-scrollbar{
    position: absolute;
    right: 0;
    width: 10px;
    background-color: #f1f1f1;
    border-radius: 20px;
}

#container::-webkit-scrollbar-thumb{
    background: #e1e1e1;
    border-radius: 20px;
    box-shadow: 1px 1px 1px #333;
}

#container::-webkit-scrollbar-thumb:hover{
    background: #ccc;
}

#container div{
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    width: 80%;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.25rem;
}

h1{
    padding-left: 2rem;
    font-style: italic;
    height: 7%;
}

/* Search */
/* From uiverse.io by @satyamchaudharydev */
/* removing default style of button */

.wrapper{
    display: flex;
    width: 95%;
    justify-content: flex-end;
}

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