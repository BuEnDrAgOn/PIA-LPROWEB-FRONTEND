<template>
<div id="main">
    <div class="wrapper">
        <img id="gameImg" src="" alt="a">

        <div>
            <h1>{{game.gameName}}</h1>
            <ul>
                <li id="categorias"><span>Categorías: </span>{{game.gameCategories}}</li>
                <li id="categorias"><span>Consolas: </span>{{game.gameConsoles}}</li>
            </ul>
        </div>
        <div id="gameScore">
            <div>
                <h2>Calificación</h2>
                <div>
                  <span class="score" ref="score"><span :style="{width: starsWidth}"></span></span>
                  <span class="score-value">{{game.gameScore}}/5</span>
                </div>
            </div>
        </div>
    </div>
    <div id="user-score-wrapper">
        <button class="flip-card__btn" v-if="admin" @click="updateGameInfo()">Actualizar</button>
        <div id="user-score-container" v-else>
            <!-- <input type="checkbox" /> -->
            <div class="btn">Calificar</div>
            <div class="tooltip">
                <div class="rating">
                  <input type="radio" id="star-1" name="star-radio" value="star-1">
                  <label for="star-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                  </label>
                  <input type="radio" id="star-2" name="star-radio" value="star-1">
                  <label for="star-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                  </label>
                  <input type="radio" id="star-3" name="star-radio" value="star-1">
                  <label for="star-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                  </label>
                  <input type="radio" id="star-4" name="star-radio" value="star-1">
                  <label for="star-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                  </label>
                  <input type="radio" id="star-5" name="star-radio" value="star-1">
                  <label for="star-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                  </label>
                </div>                
            </div>
        </div>
    </div>
    <div class="container">
        <section id="content">
          <article>
            <h2>Sinópsis</h2>
            <textarea class="synopsis-text" v-if="admin" :rows="synopsisRows" cols="165" v-model="game.games_info.game_sinopsis" @keydown="restartFeatures('sinopsis', $event)"/>
            {{!admin ? game.games_info.game_sinopsis : ''}}
          </article>

          <article>
            <h2>Características Generales</h2>
              <ul class="features row" v-if="game.games_info">
                  <li v-for="(gameF, index) in game.games_info.game_features_general" :key="gameF" lang="de">
                    <input type="text" v-if="admin" :value="gameF" @change="game.games_info.game_features_general[index] = $event.target.value" @keydown.enter="game.games_info.game_features_general.push(''); game.games_info.game_features_general[index] = $event.target.value" @keydown.delete="$event.target.value.length == 0 && game.games_info.game_features_general.length > 1 ? game.games_info.game_features_general.splice(index, 1) : null" @keydown="restartFeatures('general', $event)">
                    {{!admin ? gameF : ''}}
                  </li>  
              </ul>
           
          </article>

          <article>
            <h2>Carecterísticas Específicas</h2>
              <ul class="features row" v-if="game.games_info">
                  <li v-for="(gameF, index) in game.games_info.game_features_specific" :key="gameF" lang="de">
                    <input type="text" v-if="admin" :value="gameF" @change="game.games_info.game_features_specific[index] = $event.target.value" @keydown.enter="game.games_info.game_features_specific.push(''); game.games_info.game_features_general[index] = $event.target.value" @keydown.delete="$event.target.value.length == 0 && game.games_info.game_features_specific.length > 1? game.games_info.game_features_specific.splice(index, 1) : null" @keydown="restartFeatures('specific', $event)">
                    {{!admin ? gameF : ''}}
                  </li>  
              </ul>
          </article>

        </section>
    </div>
</div>
</template>

<script>
import { gameService } from '@/services'
import { jwtDecode } from 'jwt-decode'
export default {
    data(){
        return {
            game:{
                gameName: this.$route.params.game,
                gameScore: 0,
                games_info: false,
                gameConsoles: [],
                gameCategories: []
            },

            gameId: null,
            starsWidth: '0px',
            synopsis: "",
            admin: false,
            games_info_backup:{
                game_sinopsis: '',
                game_features_general: [''],
                game_features_specific: [''],
            }
        }
    },
    methods:{
        async getGame(game){
            await gameService.getGame({game}).then(res =>{
              const {data} = res
              if(data.games_info != null){
                data.games_info.game_features_general = JSON.parse(data.games_info.game_features_general)
                data.games_info.game_features_specific = JSON.parse(data.games_info.game_features_specific)
                this.game.games_info = {...data.games_info}
                this.games_info_backup = JSON.parse(JSON.stringify(data.games_info));
              } else if(this.admin == true) {
                this.game.games_info = {
                  game_sinopsis: '',
                  game_features_general: [''],
                  game_features_specific: [''],
                }
              }
                data.games_console.map(e =>{
                    this.game.gameConsoles.push(e.consoles.console)
                })
                data.games_category.map(e =>{
                    this.game.gameCategories.push(e.categories.category)
                })
                this.game.gameScore = data.game_score
                this.game.gameConsoles = this.game.gameConsoles.join(', ')
                this.game.gameCategories = this.game.gameCategories.join(', ')
                this.gameId = data.game_id
            })
        },

        restartFeatures(feature, event){
          if(event.ctrlKey && event.shiftKey && event.code === "KeyZ"){
            if(feature === "general"){
              this.game.games_info.game_features_general = JSON.parse(JSON.stringify(this.games_info_backup.game_features_general))
            }
            if(feature === "specific"){
              this.game.games_info.game_features_specific = JSON.parse(JSON.stringify(this.games_info_backup.game_features_specific))
            }
            if(feature === "sinopsis"){
              this.game.games_info.game_sinopsis = JSON.parse(JSON.stringify(this.games_info_backup.game_sinopsis))
            }
          }
        },

        updateGameInfo(){
          let gamesInfo = JSON.parse(JSON.stringify(this.game.games_info))
          gamesInfo.game_features_general = JSON.stringify(this.game.games_info.game_features_general)
          gamesInfo.game_features_specific = JSON.stringify(this.game.games_info.game_features_specific)
          gameService.updateGameInfo({gameId: this.gameId, games_info: gamesInfo})
        },
    },


    mounted(){
      this.game.gameName = this.game.gameName.replace(/%20/gm, ' ')
        this.getGame(this.game.gameName).then(() => {
            const rating = parseFloat(this.game.gameScore)
            const starWidth = (this.$refs.score.offsetWidth - 4*5) / 5.0
            const gaps = Math.floor(rating)

            const width = (rating * starWidth) + (4 * gaps)
            this.starsWidth = `${width}px`
        })

        if(localStorage.getItem('token')){
          const payload = jwtDecode(localStorage.getItem('token'));
          if(payload.roles.role_name === 'admin'){
            this.admin = true
          }
        }
    },

    computed: {
      synopsisRows() {
        return ((this.synopsis.length / 165) + 3) 
      }
    }
}

</script>

<style scoped>
/* font */
@font-face {
  font-family: infoGames;
  src: url(@/assets/fonts/DancingScript-VariableFont_wght.ttf) format('truetype');
  font-weight: bold;
}

#main{
    display: flex;
    flex-flow: wrap column;
    padding: 3rem;
}

/* Header */
.wrapper{
    display: flex;
    width: 100%;
    flex-flow: wrap column;
    justify-content: space-between;
    align-content: flex-start;
    height: 250px;
}

.wrapper #gameImg{
   width: 250px;
   flex: 1 1 100%;
}

.wrapper > div{
    padding-left: 2rem;
}

.wrapper > div:first-of-type{
    padding-top: 1rem;
}

.wrapper h1{
    font-size: 2rem;
}

h1 + ul{
    display: flex;
    flex-flow: wrap column;
    gap: 0.5rem;
    list-style: none;
    padding-inline-start: 1rem;
}

#categorias, #consolas{
    color: #b2b2b2
}

#categorias > span,
#consolas > span{
    color: #828282;
}

/* gameHeader */
#gameImg{
    border: 1px solid black;
}

/* GameScore */
#gameScore h2{
    font-size: 1.8rem;
}

.synopsis-text {
  resize: none;
  padding: 0 1%;
}

.score {
  margin-bottom: 5px;
  display: inline-block;
  font-size: 2rem;
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

.score-value{
  margin-left: 1rem;
  font-size: 1.5rem;
}

/* Content */
#content{
  width: 100%;
}

.container{
    display: flex;
    width: 90%;
    flex: 1 1;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid black;
}

.features{
  padding-inline-start: 1.5rem;
}
.row{
  display: flex;
  flex-flow: wrap row;
  width: 100%;
  gap: 0 2rem;
}

.row li{
  text-align: justify;
  max-width: 30%;
  align-self: flex-start;
}

article > h2{
  padding-inline-start: 2rem;
  font-family: infoGames;
}

/* UserScore */
#user-score-wrapper{
    display: flex;
    width: 90%;
    justify-content: flex-end;
}

#user-score-container {
  --background: #00bd7e;
  --icon-color: #414856;
  --shape-color-01: #b8cbee;
  --shape-color-02: #7691e8;
  --shape-color-03: #fdd053;
  --width: 2rem;
  --height: 2rem;
  --border-radius: var(--height);
  width: 10%;
  position: relative;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}
#user-score-container .btn {
  background: var(--background);
  width: 100%;
  padding: 0.5rem;
  color: white;
  position: relative;
  z-index: 3;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-animation: plus-animation-reverse 0.5s ease-out forwards;
  animation: plus-animation-reverse 0.5s ease-out forwards;
  transition: all 0.3s;
}

#user-score-container:hover .btn{
  background: white;
  color: #00bd7e;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;

}

#user-score-container .btn::before,
#user-score-container .btn::after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 4px;
  background: #fff;
}

#user-score-container .tooltip {
  width: 90px;
  height: 75px;
  border-radius: 70px;
  position: absolute;
  background: #fff;
  z-index: 2;
  padding: 0 15px;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  opacity: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: opacity 0.15s ease-in, top 0.15s ease-in, width 0.15s ease-in;
  transition-delay: 0.2s;

}
#user-score-container .tooltip::after {
  content: "";
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  margin-left: -10px;
  bottom: -8px;
  transform: rotate(45deg);
  z-index: 0;
}
#user-score-container input {
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius);
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;
  z-index: 5;
  opacity: 0;
}

#user-score-container:hover .tooltip {
  width: 190px;
  height: 70px;
  -webkit-animation: stretch-animation 1s ease-out forwards 0.15s;
  animation: stretch-animation 1s ease-out forwards 0.15s;
  top: -90px;
  opacity: 1;
  transition-delay: 0s;
}

/* Button */
.flip-card__btn:active, .button-confirm:active {
  box-shadow: 0px 0px #323232;
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #323232;
  background-color: white;
  box-shadow: 4px 4px #323232;
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
} 

.flip-card__btn:hover{
    cursor: url('@/assets/cursors/cursor.cur'), auto;
    animation: cursor 0.4s linear infinite;
}

@-webkit-keyframes stretch-animation {
  0% {
    transform: scale(1, 1);
  }
  10% {
    transform: scale(1.1, 0.9);
  }
  30% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.05, 0.95);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes stretch-animation {
  0% {
    transform: scale(1, 1);
  }
  10% {
    transform: scale(1.1, 0.9);
  }
  30% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.05, 0.95);
  }
  100% {
    transform: scale(1, 1);
  }
}

/* Stars UserScore */
.rating {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.5rem;
  --stroke: #666;
  --fill: #ffc73a;
}

.rating input {
  appearance: unset;
}

.rating label {
  cursor: pointer;
}

.rating svg {
  width: 1.5rem;
  height: 1.5rem;
  overflow: visible;
  fill: transparent;
  stroke: var(--stroke);
  stroke-linejoin: bevel;
  stroke-dasharray: 12;
  animation: idle 4s linear infinite;
  transition: stroke 0.2s, fill 0.5s;
}

@keyframes idle {
  from {
    stroke-dashoffset: 24;
  }
}

.rating label:hover svg {
  stroke: var(--fill);
}

.rating input:checked ~ label svg {
  transition: 0s;
  animation: idle 4s linear infinite, yippee 0.75s backwards;
  fill: var(--fill);
  stroke: var(--fill);
  stroke-opacity: 0;
  stroke-dasharray: 0;
  stroke-linejoin: miter;
  stroke-width: 8px;
}

@keyframes yippee {
  0% {
    transform: scale(1);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30% {
    transform: scale(0);
    fill: var(--fill);
    fill-opacity: 0;
    stroke-opacity: 1;
    stroke: var(--stroke);
    stroke-dasharray: 10;
    stroke-width: 1px;
    stroke-linejoin: bevel;
  }

  30.1% {
    stroke: var(--fill);
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
  }

  60% {
    transform: scale(1.2);
    fill: var(--fill);
  }
}


/* Cursor Animation*/
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