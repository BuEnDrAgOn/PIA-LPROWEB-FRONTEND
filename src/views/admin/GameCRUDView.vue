<template>
    <h1>Admin Games</h1>
    <div class="wrapper">
         <button class="button" type="button" @click="addGame()">
            <span class="button__text">Add Game</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
        </button>
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
    <div id="container" ref="container">
        <table>
            <thead ref="thead">
                <tr>
                    <th>Game</th>
                    <th>Conoles</th>
                    <th>Categories</th>
                    <th>Banner</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <TransitionGroup>
                    <tr v-for="game in searchList" :key="game">
                        <td>
                            <div class="input-container">
                                <input class="input" name="text" type="text" :value='game.game_name' @input="game.game_name = $event.target.value">
                                <label class="label" for="input">Game Name</label>
                                <div class="topline"></div>
                                <div class="underline"></div>
                            </div>
                        </td>
                        <td class="checkbox-dropdown">
                            <span @click="toggleConsoleList(game.game_id)" :class="{'active': visibleConsoleLists[game.game_id]}" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">Deploy</span>
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
                            <span @click="toggleCategoryList(game.game_id)" :class="{'active': visibleCategoryLists[game.game_id]}" @mousedown="$event.detail > 1 ? $event.preventDefault() : none">Deploy</span>
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
                        <td>
                            <!-- Falta contenido aquí -->
                        </td>
                        <td>
                            <div>
                                <button class="update" @click="typeof game.game_id == 'string' ? createGame(game) : updateGame(game)" :style="{'background': typeof game.game_id == 'string' ? '#00BD7E' : null}">
                                    <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path
                                            fill="currentColor"
                                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                            ></path>
                                        </svg>
                                        </div>
                                    </div>
                                </button>

                                <button class="bin-button" @click="deleteGame(game.game_id)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 39 7"
                                        class="bin-top"
                                    >
                                        <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                        <line
                                        stroke-width="3"
                                        stroke="white"
                                        y2="1.5"
                                        x2="26.0357"
                                        y1="1.5"
                                        x1="12"
                                        ></line>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 33 39"
                                        class="bin-bottom"
                                    >
                                        <mask fill="white" id="path-1-inside-1_8_19">
                                        <path
                                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                        ></path>
                                        </mask>
                                        <path
                                        mask="url(#path-1-inside-1_8_19)"
                                        fill="white"
                                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                        ></path>
                                        <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                        <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 89 80"
                                        class="garbage"
                                    >
                                        <path
                                        fill="white"
                                        d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </TransitionGroup>    
            </tbody>
        </table>
    </div>
</template>

<script>
import { categoriesService, consoleService, gameService } from '@/services'
import { v4 as uuidv4 } from 'uuid'
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

        async updateGame(game){
            await gameService.updateGame(game)
        },

        async deleteGame(gameId){
            if(typeof gameId != 'string'){
                await gameService.deleteGame(gameId).then(() =>{
                    this.games = this.games.filter(game => game.game_id !== gameId)
                })
            } else{
                this.games = this.games.filter(game => game.game_id !== gameId)
            }
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
        },

        // Add Game
        addGame(){
            const emptyGame = {
                game_id: uuidv4(),
                game_name: '',
                game_banner: null,
                games_console: [],
                games_category: []
            }

            this.games.unshift(emptyGame)
            this.$refs.container.scrollTo({
                top: this.$refs.thead.offsetTop,
                behavior: 'smooth'
            })
        },

        createGame(game){
            gameService.createGame(game).then(response => {
                const index = this.games.findIndex(obj => obj.game_id === game.game_id);
                if (index !== -1) {
                    this.games[index].game_id = response.data.game_id;
                    this.games[index].games_category.forEach(category => {
                        category.game_id = newGameId;
                    })
                    this.games[index].games_console.forEach(console => {
                        console.game_id = newGameId;
                    })
                }
            })
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
  },
    
}

</script>

<style scoped>
#container{
    display: flex;
    flex-flow: wrap column;
    align-items: flex-end;
    margin-block-start: 1rem;
    padding: 2rem 1.5rem;
    height: 80%;
    width: 100%;
    flex-grow: 1;
    box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);
    border-radius: 10px;
    overflow-y: auto;
    gap: 1rem;
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

#container > div{
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
table{
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    min-width: 1450px;
}

thead{
    background: black;
    color: white;
}

th, td{
    padding: 0.5rem 1rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

th:last-child{
    width: 10%;
}

tr{
    border: 1px solid #ccc;
    transition: all 0.3s;
}

tr.v-enter-from{
    transform: translateX(-30%);
}

tr.v-leave-to{
    transform: translateX(30%);
    opacity: 0;
}

tbody tr:nth-child(odd){
    background: #f2f2f2;
}

td{
    position: relative;    
    text-align: center;
    vertical-align: middle;

    border-bottom: 1px solid #ccc;
}

tbody tr td > *{
    width: 100%;
    padding: 0.5rem 1rem;
}

/* Input */
.input-container {
  position: relative;
  padding: 0;
}

.input-container .input{
  padding: 1rem;
  height: 40px;
  border: 2px solid black;
  border-top: none;
  border-bottom: none;
  font-size: 16px;
  background: transparent;
  outline: none;
  box-shadow: 7px 7px 0px 0px black;
  transition: all 0.5s;
}

.input-container .input:focus {
  box-shadow: none;
  transition: all 0.5s;
}

.input-container .label {
  position: absolute;
  top: 10px;
  left: 10px;
  color: black;
  transition: all 0.5s;
  transform: scale(0);
  z-index: 3;
}

.input-container .topline {
  position: absolute;
  content: "";
  background-color: black;
  width: 0%;
  height: 2px;
  right: 0;
  top: 0;
  transition: all 0.5s;
}

.input-container input[type="text"]:focus ~ .topline {
  width: 68%;
  transition: all 0.5s;
}

.input-container .underline {
  position: absolute;
  content: "";
  background-color: black;
  width: 0%;
  height: 2px;
  right: 0;
  bottom: 0;
  transition: all 0.5s;
}

.input-container input[type="text"]:focus ~ .underline {
  width: 100%;
  transition: all 0.5s;
}

.input-container input[type="text"]:focus ~ .label {
  top: -10px;
  transform: scale(1);
  transition: all 0.5s;
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
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 50%;
    border-radius: 5px;
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
    background: rgb(200, 200, 200);
    background: linear-gradient(135deg, var(--mycolor1) 40%, var(--mycolor2) 60%);
    background-size: 150% 100%;
    animation: cursor 0.4s linear infinite;

    transition: --mycolor1 1s, --mycolor2 1s, background-position 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s;
}

.checkbox-dropdown > span:hover{
    background-position: 50%;
    --mycolor1: rgb(204, 242, 229);
    --mycolor2: rgb(204, 242, 229);
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    animation: cursor 0.4s linear infinite;

    border-color: white;
}

.checkbox-dropdown > span.active{
    --mycolor1: #00bd7e;
    --mycolor2: #00bd7e;
    color: white;
}

/* Dropdown checkbox */
tr > td > ul{
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
    transform: translate(-50%, -20%);
    left: 50%;
    z-index: 1;
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

ul li > *:hover{
    align-self: center;
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    animation: cursor 0.4s linear infinite;
}


ul label{
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    height: 20px;
}

.checkbox-dropdown ul.visible{
    visibility: visible;
    transform: translate(-50%, 0);
    opacity: 1;
}

/* Checkbox */

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


/* Action buttons */
td > div{
    display: flex;
    align-items: center;
    gap: 5px;
}
/* Delete */
.bin-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(255, 95, 95);
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    animation: cursor 0.4s linear infinite;

  border: 2px solid rgb(255, 201, 201);
  transition-duration: 0.3s;
  position: relative;
  overflow: hidden;
}
.bin-bottom {
  width: 50%;
  z-index: 2;
}
.bin-top {
  width: 50%;
  transform-origin: right;
  transition-duration: 0.3s;
  z-index: 2;
}
.bin-button:hover .bin-top {
  transform: rotate(45deg);
}
.bin-button:hover {
  background-color: rgb(255, 0, 0);
}
.bin-button:active {
  transform: scale(0.9);
}
.garbage {
  position: absolute;
  width: 13.6363636364%;
  height: auto;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s;
}
.bin-button:hover .garbage {
  animation: throw 0.4s linear;
}
@keyframes throw {
  from {
    transform: translate(-400%, -700%);
    opacity: 0;
  }
  to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}

/* Update */
.update {
    display: flex;
    width: calc(45% - 2px);
    height: 38px;
    font-family: inherit;
    background: royalblue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s;
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    animation: cursor 0.4s linear infinite;

}

.update svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
  width: 60%;
}

.update .svg-wrapper{
    display: flex;
    justify-content: center;
}

.update:hover .svg-wrapper {
    display: flex;
    justify-content: center;
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.update:hover svg {
  transform: rotate(45deg) scale(1.1);
}

.update:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

/* Add Item */
.button {
  --main-focus: #2d8cf0;
  --font-color: #323232;
  --bg-color-sub: #eee;
  --bg-color: #fff;
  --main-color: #323232;
  position: relative;
  width: 145px;
  height: 40px;
    cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
    animation: cursor 0.4s linear infinite;

  display: flex;
  align-items: center;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  background-color: var(--bg-color);
  border-radius: 5px;
  margin-right: 2rem;
  padding: 0;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(40%);
  color: var(--font-color);
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  height: 100%;
  width: 26%;
  background-color: var(--bg-color-sub);
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
}

.button .svg {
  width: 20px;
  fill: var(--main-color);
}

.button:hover {
  background: var(--bg-color);
  padding: 0;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
    width: 100%;
    transform: translateX(0);
}

.button:active {
  transform: translate(3px, 3px);
  box-shadow: 0px 0px var(--main-color);
}

/* Search */
/* From uiverse.io by @satyamchaudharydev */
/* removing default style of button */

.wrapper{
    display: flex;
    width: 95%;
    flex-flow: column-reverse;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;
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

/* Cursor */
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
</style>