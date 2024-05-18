<template>
    <div id="container-sesion" v-if="visible" @mousedown="visible = false">
        <div class="wrapper-sesion" @mousedown.stop>
            <div class="card-switch">
                <label class="switch">
                <input type="checkbox" class="toggle">
                <span class="slider"></span>
                <span class="card-side"></span>
                <div class="flip-card__inner">
                    <div class="flip-card__front">
                        <div class="title">Log in</div>
                        <form class="flip-card__form" action="" @submit.prevent>
                            <label class="error" v-if="errors.logIn.credentials != null"> {{errors.logIn.credentials}}</label>
                          
                            <input class="flip-card__input" name="email" placeholder="Email" type="email" v-model="user.user_email">
                            <input class="flip-card__input" name="password" placeholder="Password" type="password" v-model="user.user_password">
                            <button class="flip-card__btn" @click="logIn()">Let`s go!</button>
                        </form>
                    </div>
                    <div class="flip-card__back">
                        <div class="title">Sign in</div>
                        <form class="flip-card__form" action="" @submit.prevent>
                            <div>
                              <label class="error" v-if="errors.signIn.name != null"> {{errors.signIn.name}}</label>
                              <input class="flip-card__input" placeholder="Name" type="name" v-model="user.user_name" @blur="handleName">
                            </div>

                            <div>
                              <label class="error" v-if="errors.signIn.email != null"> {{errors.signIn.email}}</label>
                              <input class="flip-card__input" name="email" placeholder="Email" type="email" v-model="user.user_email" @blur="handleEmail">
                            </div>

                            <div>
                              <label class="error" v-if="errors.signIn.password != null"> {{errors.signIn.password}}</label>
                              <input class="flip-card__input" name="password" placeholder="Password" type="password" v-model="user.user_password" @blur="handlePassword">
                            </div>

                            <div>
                              <label class="error" v-if="errors.signIn.confirmPassword != null"> {{errors.signIn.confirmPassword}}</label>
                              <input class="flip-card__input" name="confirm_password" placeholder="Confirm Password" type="password" v-model="confirm_password" @input="handleConfirmPassword">
                            </div>
                            <button class="flip-card__btn" @click="signIn">Confirm!</button>
                        </form>
                    </div>
                </div>
                </label>
            </div>   
        </div>
    </div>
</template>

<script>
import { userService } from '@/services'
import { jwtDecode } from 'jwt-decode'
export default {
    data(){
        return {
            visible: false,
            user:{
              user_name: null,
              user_email: null,
              user_password: null,
            },
            confirm_password: null,

            errors:{
              signIn:{
                name: null,
                password: null,
                confirmPassword: null,
                email: null
              },

              logIn:{
                credentials: null
              }
            },
        }
    },

    methods:{
      logIn(){
        userService.logIn(this.user).then((res) => {
          if(res.status === 200){
            const payload = jwtDecode(res.data);
            this.visible = false
            localStorage.setItem('token', res.data);
            if(payload.roles?.role_name === 'admin'){
              this.$emit('admin', true)
            } else{
              this.$emit('admin', false)
            }
          }
        }).catch((e) =>{
          this.errors.logIn.credentials = 'Credenciales incorrectas'
        })
      },

      signIn(){
        this.handleAll()
        const confirm = !Object.values(this.errors.signIn).some(e => e !== null)
        if(confirm){
          userService.signIn(this.user)
        }
      },

      handleName(){
        if(!this.user.user_name){
          this.errors.signIn.name = 'Escriba un nombre'
        }else{
          this.errors.signIn.name = null
        }
      },
      
      handleEmail(){
        const regex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
        if(!regex.test(this.user.user_email)){
          this.errors.signIn.email = 'Escriba un email válido'
        } else {
          this.errors.signIn.email = null
        }
      },

      handlePassword(){
        if(!this.user.user_password){
          this.errors.signIn.password = 'Escriba una contraseña'
        }else{
          if(this.user.user_password.length < 8){
            this.errors.signIn.password = 'Escriba una contraseña de 8 dígitos como mínimo'
          } else {
            this.errors.signIn.password = null
          }
        }
      },

      handleConfirmPassword(){
        if(!this.confirm_password){
          this.errors.signIn.confirmPassword = 'Escriba una contraseña'
        }else{
          if(this.confirm_password !== this.user.user_password){
            this.errors.signIn.confirmPassword = 'Las contraseñas no coinciden'
          } else {
            this.errors.signIn.confirmPassword = null
          }
        }
      },
      
      handleAll(){
        this.handleEmail()
        this.handleName()
        this.handlePassword()
        this.handleConfirmPassword()
      }
    },

}
</script>

<style scoped>
*{
   cursor: url('@/assets/cursors/cursor.cur'), auto;
}

/* Errores */
.error{
  position: absolute;
  top: -1.75rem;
  left: 0.25rem;
  /* background: white; */
  color: rgb(255, 6, 6);
  padding: 0.2rem 1rem;
  border-radius: 5px;
  }
/* Sesion */
#container-sesion{
    display: flex;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 10;
    background: rgba(0, 0, 0, 0.281);
    justify-content: center;
    align-items: center;
}

.wrapper-sesion {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 5vh;
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: -0.5rem;
  border-radius: 5px;
  padding: 0.3rem 0.5rem;
  color: var(--font-color);
  font-weight: 600;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  box-shadow: 3px 3px var(--main-color);
  transition: all 0.3s;
  transform: translate(3px, 3px);
  box-shadow: none;
  
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: -0.5rem;
  width: 72px;
  text-decoration: none;
  border-radius: 5px;
  padding: 0.3rem .5rem;
  color: var(--font-color);
  font-weight: 600;
  background: lightgray;
  border: 2px solid var(--main-color);
  box-shadow: 3px 3px var(--main-color);
  transition: all 0.3s;
  
}

.card-side:hover::after, .card-side:hover::before{
    cursor: url('@/assets/cursors/cursor.cur'), auto;
    animation: cursor 0.4s linear infinite;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: url('@/assets/cursors/cursor.cur'), auto;
  animation: cursor 0.4s linear infinite;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
  
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
  background: lightgray;
  transform: none;
  box-shadow: 4px 4px var(--main-color);
}

.toggle:checked ~ .card-side:after {
  transform: translate(3px, 3px);
  background: var(--bg-color);
  box-shadow: none;
}

/* card */ 

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
    /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front, .flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.flip-card__form > div{
  position: relative;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
} 

.flip-card__btn:hover{
    cursor: url('@/assets/cursors/cursor.cur'), auto;
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
</style>