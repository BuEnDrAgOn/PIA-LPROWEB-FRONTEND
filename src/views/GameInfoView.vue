<template>
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
                <span class="score" ref="score"><span :style="{width: starsWidth}"></span></span>
            </div>          
        </div>
    </div>
    <!-- <div id="container">
    </div> -->
</template>

<script>
import { gameService } from '@/services'
export default {
    data(){
        return {
            game:{
                gameName: this.$route.params.game,
                gameScore: 0,
                gameInfo: null,
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
                console.log(data)
                data.games_console.map(e =>{
                    this.game.gameConsoles.push(e.consoles.console)
                })
                data.games_category.map(e =>{
                    this.game.gameCategories.push(e.categories.category)
                })
                this.game.gameConsoles = this.game.gameConsoles.join(', ')
                this.game.gameCategories = this.game.gameCategories.join(', ')
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
            console.log(this.starsWidth)
        })

    },
}

</script>

<style scoped>
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

/* Content */

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

/* gameHeader */
#gameImg{
    border: 1px solid black;
}

/* YourScore */

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
</style>