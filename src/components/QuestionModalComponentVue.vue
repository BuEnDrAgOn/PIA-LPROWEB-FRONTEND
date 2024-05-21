<template>
      <div class="modal-background" v-if="visible" @mousedown="visible = false">
        <section class="modal-wrap" @mousedown.stop>
          <h2>Report a Question</h2>
          <div class="modal-content">
            <div>
                <label class="error" v-if="error"> {{error}}</label>
                <input type="text" placeholder="Your question" v-model="userQuestion.question_info">
            </div>
          </div>
          <button  class="submit" @click="sendQuestion()">Enviar</button>
        </section>
      </div>
</template>

<script>
import { userService } from '@/services'
import { jwtDecode } from 'jwt-decode'
export default {
    data(){
        return {
            visible: false,
            userQuestion:{
              user_id: null,
              question_info: null,
            },
            error: null
        }
    },

    methods:{
      sendQuestion(){
        if(this.userQuestion.question_info != null && jwtDecode(localStorage.getItem('token')).user_id){
          this.error = null
          this.userQuestion.user_id = jwtDecode(localStorage.getItem('token')).user_id
          userService.createUserQuestion(this.userQuestion).then((res) =>{
            this.visible = false
          }).catch((error) => {
            this.error = 'Error al mandar la pregunta'
          })
        } else{
          this.error = 'Escriba una pregunta'
        }
      }
    }

}
</script>

<style scoped>
*{
   cursor: url('@/assets/cursors/cursor.cur'), auto;
}

.error{
  top: -1.75rem;
  left: 0.25rem;
  /* background: white; */
  color: rgb(255, 6, 6);
  padding: 0.2rem 1rem;
  border-radius: 5px;
}

.modal-background{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.modal-wrap{
  padding: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-flow: wrap column;
  position: fixed;
  width: 300px;
  border-radius: 1rem;
  
  background: white;
}

.modal-wrap button.submit{
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  border: none;
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: #333;

  box-shadow: 0px 0px 7px 5px rgba(64,60,67,.16);
  transition: all 0.3s;
}

.modal-wrap button.submit:hover{
  background: #ffffff;
  color: black;
}

.modal-wrap > div:first-of-type{
  display: flex;
  flex-flow: wrap column;
  width: 100%;
  align-items: flex-end;
}


.modal-wrap > h2{
  text-align: center;
}

.modal-content > div{
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: 1rem;
}

.modal-content input{
  width: 100%;
  padding: 1rem 0.5rem;
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
</style>