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
        <div id="user-score-container">
            <!-- <input type="checkbox" /> -->
            <div class="btn">Calificar</div>
            <div class="tooltip">
                <form id="form">
                    <p class="clasificacion">
                        <input id="radio1" type="radio" name="estrellas" value="5"><!--
                        --><label for="radio1">★</label><!--
                        --><input id="radio2" type="radio" name="estrellas" value="4"><!--
                        --><label for="radio2">★</label><!--
                        --><input id="radio3" type="radio" name="estrellas" value="3"><!--
                        --><label for="radio3">★</label><!--
                        --><input id="radio4" type="radio" name="estrellas" value="2"><!--
                        --><label for="radio4">★</label><!--
                        --><input id="radio5" type="radio" name="estrellas" value="1"><!--
                        --><label for="radio5">★</label>
                    </p>
                </form>
            </div>
        </div>
    </div>
    <div class="container">
        <section id="content">
          <article>
            <h2>Sinópsis</h2>
            <p v-if="game.gameInfo">
              {{game.gameInfo.game_sinopsis}}
            </p>
          </article>

          <article>
            <h2>Características Generales</h2>
            <div class="column">
              <ul class="features row">
                  <li v-for="gameF in game.gameInfo.game_features_general" :key="gameF" lang="de">{{gameF}}</li>  
              </ul>
            </div>
           
          </article>

          <article>
            <h2>Carecterísticas Específicas</h2>
              <ul class="features row">
                  <li v-for="gameF in game.gameInfo.game_features_specific" :key="gameF" lang="de">{{gameF}}</li>  
              </ul>
          </article>

        </section>
    </div>
</div>
</template>

<script>
import { gameService } from '@/services'
export default {
    data(){
        return {
            game:{
                gameName: this.$route.params.game,
                gameScore: 0,
                gameInfo: false,
                gameConsoles: [],
                gameCategories: []
            },
            starsWidth: '0px'
        }
    },
    methods:{
        async getGame(game){
            await gameService.getGame({game}).then(res =>{
                const {data} = res
                data.games_console.map(e =>{
                    this.game.gameConsoles.push(e.consoles.console)
                })
                data.games_category.map(e =>{
                    this.game.gameCategories.push(e.categories.category)
                })
                this.game.gameConsoles = this.game.gameConsoles.join(', ')
                this.game.gameCategories = this.game.gameCategories.join(', ')
                this.game.gameInfo = data.games_info
                this.game.gameInfo.game_features_general = this.game.gameInfo.game_features_general.split('|')
                this.game.gameInfo.game_features_specific = this.game.gameInfo.game_features_specific.split('|')
                console.log(this.game.gameInfo.game_features_general)
            })
        }

    },

    mounted(){
        this.getGame(this.game.gameName).then(() => {
            const rating = parseFloat(this.game.gameScore)
            const starWidth = (this.$refs.score.offsetWidth - 4*5) / 5.0
            const gaps = Math.floor(rating)

            const width = (rating * starWidth) + (4 * gaps)
            this.starsWidth = `${width}px`
        })

    },
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
  gap: 0 2rem;
}

.column{
  display: flex;
  flex-flow: wrap column;
}

.column li{
  hyphens: auto;
  width: 30%;
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
  cursor: pointer;
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
  cursor: pointer;
  position: absolute;
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
#form {
    display: flex;
}

#form p {
  text-align: center;
}

#form label {
  font-size: 1.5rem;
}

input[type="radio"] {
  display: none;
}

label {
  color: grey;
}

.clasificacion {
  direction: rtl;
  unicode-bidi: bidi-override;
}

label:hover,
label:hover ~ label {
  color: orange;
  cursor: pointer;
}

input[type="radio"]:checked ~ label {
  color: orange;
}

</style>