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
            <thead>
                <tr>
                    <th>Juego</th>
                    <th>Consolas</th>
                    <th>Categorías</th>
                    <th>Banner</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in searchList" :key="game">
                    <td>
                        <input type="text" :value='game.game_name'>
                    </td>
                    <td class="checkbox-dropdown">
                        <span @click="toggleConsoleList(game.game_id)" :class="{'active': visibleConsoleLists[game.game_id]}" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">Desplegar</span>
                        <ul :class="{'visible': visibleConsoleLists[game.game_id]}">
                            <li v-for="consola in consoles" :key="consola">
                                <label class="container">
                                    <input type="checkbox" :id="consola.console + game.game_id" @change="handleConsoleChange(game, consola, $event)">
                                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                                        <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                    </svg>
                                </label>
                                <label :for="consola.console + game.game_id" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">{{consola.console}}</label>
                            </li>
                        </ul>
                    </td>
                    <td class="checkbox-dropdown">
                        <span @click="toggleCategoryList(game.game_id)" :class="{'active': visibleCategoryLists[game.game_id]}" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">Desplegar</span>
                        <ul :class="{'visible': visibleCategoryLists[game.game_id]}">
                            <li v-for="category in categories" :key="category">
                                <label class="container">
                                    <input type="checkbox" :id="category.category + game.game_id" @change="handleCategoryChange(game, category, $event)">
                                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                                        <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                    </svg>
                                </label>
                                <label :for="category.category + game.game_id" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">{{category.category}}</label>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { categoriesService, consoleService, gameService } from '@/services'
export default {
    data(){
        return{
            games: null,
            consoles: null,
            categories: null,
            search: '',

            visibleConsoleLists:{},
            visibleCategoryLists:{},
            lastSelectedGameId: null
        }
    },
    methods:{
        async getGames(){
            await gameService.getAllGames().then((response) =>{
                this.games = response.data
            })
        },
        
        async getCategories(){
            await categoriesService.getAllCategories().then( response =>{
                this.categories = response.data
            })
        },

        async getConsoles(){
            await consoleService.getConsoles().then(response =>{
                this.consoles = response.data
            })
        },

        // Console List Display

        handleConsoleChange(game, consola, event){
            const isChecked = event.target.checked
            const isConsoleInGame = game.games_console.some(item => item.console_id === consola.console_id);
            
            if (isChecked && !isConsoleInGame){
                game.games_console.push({ game_id: game.game_id, console_id: consola.console_id });
            } else if(!isChecked && isConsoleInGame){
                game.games_console = game.games_console.filter(item => item.console_id !== consola.console_id);
            }
        },

        toggleConsoleList(gameId){
            this.visibleConsoleLists[gameId] = !this.visibleConsoleLists[gameId];

            if (this.lastSelectedGameId !== gameId) {
                if (this.lastSelectedGameId !== null) {
                    this.visibleConsoleLists[this.lastSelectedGameId] = false;
                    this.visibleCategoryLists[this.lastSelectedGameId] = false;

                }
                this.lastSelectedGameId = gameId;
            }
        },

        // Category List Display

        handleCategoryChange(game, category, event){
            const isChecked = event.target.checked
            const isCategoryInGame = game.games_category.some(item => item.category_id === category.category_id);
            
            if (isChecked && !isCategoryInGame){
                game.games_category.push({ game_id: game.game_id, category_id: category.category_id });
            } else if(!isChecked && isCategoryInGame){
                game.games_category = game.games_category.filter(item => item.category_id !== category.category_id);
            }

            console.log(this.games[0].games_category[0])
        },

        toggleCategoryList(gameId){
            this.visibleCategoryLists[gameId] = !this.visibleCategoryLists[gameId];

            if (this.lastSelectedGameId !== gameId) {
                if (this.lastSelectedGameId !== null) {
                    this.visibleConsoleLists[this.lastSelectedGameId] = false;
                    this.visibleCategoryLists[this.lastSelectedGameId] = false;
                }
                this.lastSelectedGameId = gameId;
            }
        }
    },

    mounted(){
        Promise.all([this.getCategories(), this.getConsoles(), this.getGames()]).then(() =>{
            // Iterar sobre los juegos
            this.games.forEach(game => {
                // Iterar sobre las consolas
                this.consoles.forEach(consola => {
                    // Verificar si la consola está asociada al juego
                    const isConsoleInGame = game.games_console.some(item => item.console_id === consola.console_id);
                    // Si la consola está asociada al juego, marcar el checkbo
                    if (isConsoleInGame) {
                        document.getElementById(consola.console + game.game_id).checked = true
                    }
                })

                this.categories.forEach(category => {
                    const isCategoryInGame = game.games_category.some(item => item.category_id === category.category_id);

                    if (isCategoryInGame){
                        document.getElementById(category.category + game.game_id).checked = true
                    }
                })
            })
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

/* Table */
tbody tr td > *{
    padding: 0.5rem 1rem;
}

/* Checkbox-dropdown */

@property --mycolor1 {
    syntax: '<color>';
    initial-value: rgb(255, 255, 255);
    inherits: false;
}

@property --mycolor2 {
    syntax: '<color>';
    initial-value: rgb(204, 242, 229);
    inherits: false;
}

.checkbox-dropdown > span{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #ccc;

    background: rgb(200, 200, 200);
    background: linear-gradient(135deg, var(--mycolor1) 40%, var(--mycolor2) 60%);
    background-size: 150% 100%;

    transition: --mycolor1 1s, --mycolor2 1s, background-position 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s;
}

.checkbox-dropdown > span:hover{
    background-position: 50%;
    --mycolor1: rgb(204, 242, 229);
    --mycolor2: rgb(204, 242, 229);
    cursor: pointer;
    border-color: white;
}

.checkbox-dropdown > span.active{
    --mycolor1: #00bd7e;
    --mycolor2: #00bd7e;
    color: white;
}

/* Dropdown checkbox */
ul{
    display: flex;
    flex-flow: column;
    gap: 1rem;
    position: absolute;
    visibility: hidden;
    list-style: none;
    background: white;
    padding: 0;
    box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);
    border-radius: 5px;
    padding: 1rem;
    max-height: 200px;
    max-width: 150px;
    overflow-x: auto;
    overflow-y: auto;

    opacity: 0;
    transition: all 0.3s;
    transform: translateY(-20%);
}

ul::-webkit-scrollbar{
    position: absolute;
    right: 0;
    width: 7px;
    background-color: #f1f1f1;
    border-radius: 20px;
}

ul::-webkit-scrollbar-thumb{
    background: #d1d1d1;
    border-radius: 20px;
    box-shadow: 1px 1px 1px #333;
}

ul::-webkit-scrollbar-thumb:hover{
    background: #b2b2b2;
}

ul::-webkit-scrollbar-thumb:active{
    box-shadow: inset 0 2px 5px 1px rgba(64,60,67,.8);
}

ul li{
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
}

ul li *{
    cursor: pointer;
    align-self: center;
}

ul label{
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    height: 20px;
}

.checkbox-dropdown ul.visible{
    visibility: visible;
    transform: translateY(0%);
    opacity: 1;
}

/* Checkbox */
.container {
  cursor: pointer;
}

.container input {
  display: none;
}

.container svg {
  overflow: visible;
  height: 1rem;
}

.path {
  fill: none;
  stroke: black;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
  stroke-dasharray: 241 9999999;
  stroke-dashoffset: 0;
}

.container input:checked ~ svg .path {
  stroke-dasharray: 70.5096664428711 9999999;
  stroke-dashoffset: -262.2723388671875;
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