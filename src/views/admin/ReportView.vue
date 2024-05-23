<template>
    <h2 id="title">Reportes</h2>
    <section>
        <article>
            <h3>Usuarios este mes</h3>
            <ul>
                <li>
                    Nuevos: <span class="game-font">{{users.newUsers}}</span>
                </li>
                <li>
                    Total: <span class="game-font">{{users.totalUsers}}</span>
                </li>
            </ul>
        </article>

        <article>
            <h3>Usuarios activos</h3>
            <ul>
                <li>
                    Este mes: <span class="game-font">{{userActivity.activityMonth}}</span>
                </li>
                <li>
                    Total: <span class="game-font">{{userActivity.activityTotal}}</span>
                </li>
            </ul>
        </article>

        <article v-if="game">
            <h3>Mejor juego de este mes</h3>
            <span>Su puntaje promedio de este mes fue de: <span class="game-font">{{game.scoreThisMonth}}</span></span> 
            <div id="gameScore" @click="gamePage(game.game_name)">
                <h2>{{game.game_name}}</h2>
                <div class="rating">
                    <p>
                    <span class="score"><span v-score='game.game_score'></span></span>
                    </p>
                    <span id="arrow"></span>
                </div>
            </div>
        </article>
    </section>
  
</template>

<script>
import { reportService } from '@/services'
import { ref } from 'vue'
export default {
    data(){
        return {
            users:'',
            userActivity: '',
            game: null,

            starsWidth: 0
        }
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

    methods:{
    gamePage(game){
      this.$router.push({path: `/game/${game}`})
    },
    },

    mounted(){
        reportService.countNewUsers().then((res) =>{
            this.users = res.data
        })

        reportService.countUserActivity().then((res) =>{
            this.userActivity = res.data
        })

        reportService.bestGame().then((res) =>{
            this.game = res.data 
        })
    }

}
</script>

<style scoped>
.game-font{
    font-family: gamesMenu;
}

section{
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    align-content: center;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
    padding: 2rem;
    gap: 2rem;

    height: 78vh;
    max-height: 78vh;
    overflow-y: auto;
}

article{
    display: flex;
    flex-flow: wrap column;
    align-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    gap: 1rem;
    padding: 2rem;
    font-size: 2rem;
}

article h3{
    width: 100%;
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
}

article > div {
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

article div:hover{
  background: #CCF2E5;
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;
}

article > span{
    width: 100%;
    font-size: 1.3rem;
}

.rating{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
  /* font-size: 2.5rem; */
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

ul{

    padding: 0;
    list-style: none;
}

#title{
    padding-left: 2rem;
    font-style: italic;
    height: 7%;
}

@media (max-width: 900px){
    article{
        padding: 1rem;
        font-size: 1.5rem;
    }
}

@media (max-width: 530px){
    section{
        align-content: space-between;
        grid-template-columns: 1fr;
    }
    article{
        font-size: 2rem;
    }
}
</style>