<template>
    <div class="row">
        <h1>Character</h1>
        
        <div>
            <label class="error" v-if="errors.updateUser != null"> {{errors.updateUser}}</label>
        </div>
    </div>
    <div id="container" class="row">
        <div>
            <h2>Nickname</h2>
            <div class="input-container">
                <input class="input" name="text" type="text"  v-model="profile.name" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)">
                <label class="label" for="input">Name</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
        <div>
            <h2>Old Runes</h2>
            <div class="input-container">
                <div>
                    <label class="error" v-if="errors.oldPassword != null"> {{errors.oldPassword}}</label>
                </div>
                <input class="input password" name="text" type="text" v-model="profile.password" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">Old Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
        <div>
            <h2>New Runes</h2>
            <div class="input-container">
                <div>
                    <label class="error" v-if="errors.newPassword != null"> {{errors.newPassword}}</label>
                </div>
                <input class="input password" name="text" type="text" v-model="newPassword" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">New Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
        <div>
            <h2>Confirm New Runes</h2>
            <div class="input-container">
                <div>
                    <label class="error" v-if="errors.confirmNewPassword != null"> {{errors.confirmNewPassword}}</label>
                </div>
                <input class="input password" name="text" type="text" v-model="confirmNewPassword" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">Confirm Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>

         <button @click="saveCharacter">
            P L A Y
            <div id="clip">
                <div id="leftTop" class="corner"></div>
                <div id="rightBottom" class="corner"></div>
                <div id="rightTop" class="corner"></div>
                <div id="leftBottom" class="corner"></div>
            </div>
            <span id="rightArrow" class="arrow"></span>
            <span id="leftArrow" class="arrow"></span>
        </button>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { userService } from '@/services'

export default {
    data() {
        return {
            profile: {
                name: "",
                last_name: "",
                password: ""
            },
            admin: null,
            user: null,
            newPassword: null,
            confirmNewPassword: null,
            errors: {
                newPassword: null,
                confirmNewPassword: null,
                oldPassword: null,
                updateUser: null
            }
        }
    },
    methods: {
        labelWidth(element){
            const label = element.nextElementSibling;
            const labelWidth = label.offsetWidth;
            const topline = label.nextElementSibling;

            topline.style.width = `calc(100% - ${labelWidth}px - 20px)`
        },

        resetLabelWidth(element){
            const label = element.nextElementSibling;
            const topline = label.nextElementSibling;

            topline.style.width = `0px`
        },
        
        saveCharacter() {
            if( this.newPassword ) {
                if( this.newPassword.length >= 8 ){
                    if(this.newPassword == this.confirmNewPassword) {
                        this.errors.newPassword = null
                        this.errors.confirmNewPassword = null
                        this.errors.updateUser = null
                        const user = {
                            user_id: jwtDecode(localStorage.getItem('token')).user_id,
                            old_password: this.profile.password,
                            new_password: this.newPassword,
                            user_email: jwtDecode(localStorage.getItem('token')).user_email,
                            user_name: this.profile.name
                        }

                        if(!this.profile.password) {
                            this.errors.oldPassword = 'Write your current spell.'
                            this.errors.updateUser = 'Write your current spell.'
                        } else{
                            this.errors.oldPassword = null
                            if(this.profile.password == jwtDecode(localStorage.getItem('token')).user_password) {
                                userService.update(user).then((res) => {
                                    if(res.status === 200){
                                        const payload = jwtDecode(res.data);
                                        localStorage.setItem('token', res.data);
                                        if(payload.roles?.role_name === 'admin'){
                                            this.$emit('admin', true);
                                        } else{
                                            this.$emit('admin', false);
                                        }
                                    }
                                }).catch((e) =>{
                                    this.errors.updateUser = "Your spell doesn't match with that nickname."
                                })
                            } else {
                                this.errors.oldPassword("Your current spell isn't the same.");
                            }
                        }
                    } else {
                        this.errors.newPassword = "Runes aren't the same."
                        this.errors.confirmNewPassword = "Runes aren't the same"
                    }
                } else {
                    this.errors.newPassword = 'You need almost 8 runes to cast this spell.'
                    this.errors.updateUser = 'You need more runes to cast this spell.'
                }
            } else {
                this.errors.newPassword = 'You should create a new spell. Choose your runes.'
            }
        }
    },
    mounted() {
        if(localStorage.getItem('token')){
        const payload = jwtDecode(localStorage.getItem('token'))
        if(payload.roles.role_name === 'admin'){
            this.admin = true
        }
        this.user = true;
        this.profile.name = payload.user_name
        }
    }
}

</script>

<style scoped>

@font-face {
  font-family: norseFont;
  src: url(@/assets/fonts/English_Runic.ttf);
}

.input-container {
  position: relative;
  padding: 0;
}

.input-container .input{
  width: 100%;
  padding: 2rem 1rem;
  border: 2px solid black;
  border-top: none;
  border-bottom: none;
  font-size: 1.5rem;
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
  font-size: 1.5rem;
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
  top: -20px;
  transform: scale(1);
  transition: all 0.5s;
}

.password { 
    font-family: norseFont !important;
}

#container{
    display: grid;
    grid-template-areas: 
        "nickname nickname"
        "password confirm-password";
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    align-content: center;
    justify-items: center;
    padding: 3rem 0;
    height: 93%;
    width: 100%;
    /* flex-grow: 1; */
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

#container > div{
    display: flex;
    flex-flow: column wrap;
    font-size: 1.5rem;
    justify-content: space-evenly;
    width: 80%;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.25rem;
    gap: 1rem;
}

h1{
    padding-left: 2rem;
    font-style: italic;
    height: 7%;
}

h2{
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
}

button {
  position: relative;
  grid-column: 1/3;
  width: 11em;
  height: 4em;
  outline: none;
  transition: 0.1s;
  background-color: transparent;
  border: none;
  font-size: 13px;
  font-weight: bold;
  color: rgb(68, 68, 68);
}



#clip {
  --color: #2761c3;
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 5px double var(--color);
  box-shadow: inset 0px 0px 15px #195480;
  -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.arrow {
  position: absolute;
  transition: 0.2s;
  background-color: #2761c3;
  top: 35%;
  width: 11%;
  height: 30%;
}

#leftArrow {
  left: -9.5%;
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
}

#rightArrow {
  -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
  left: 107%;
}

button:hover #rightArrow {
  background-color: #27c39f;
  left: -15%;
  animation: 0.6s ease-in-out both infinite alternate rightArrow8;
}

button:hover #leftArrow {
  background-color: #27c39f;
  left: 111%;
  animation: 0.6s ease-in-out both infinite alternate leftArrow8;
}

.corner {
  position: absolute;
  width: 4em;
  height: 4em;
  background-color: #2761c3;
  box-shadow: inset 1px 1px 8px #2781c3;
  transform: scale(1) rotate(45deg);
  transition: 0.2s;
}

#rightTop {
  top: -1.98em;
  left: 91%;
}

#leftTop {
  top: -1.96em;
  left: -3.0em;
}

#leftBottom {
  top: 2.10em;
  left: -2.15em;
}

#rightBottom {
  top: 45%;
  left: 88%;
}

button:hover #leftTop {
  animation: 0.1s ease-in-out 0.05s both changeColor8,
  0.2s linear 0.4s both lightEffect8;
}

button:hover #rightTop {
  animation: 0.1s ease-in-out 0.15s both changeColor8,
  0.2s linear 0.4s both lightEffect8;
}

button:hover #rightBottom {
  animation: 0.1s ease-in-out 0.25s both changeColor8,
  0.2s linear 0.4s both lightEffect8;
}

button:hover #leftBottom {
  animation: 0.1s ease-in-out 0.35s both changeColor8,
  0.2s linear 0.4s both lightEffect8;
}

button:hover .corner {
  transform: scale(1.25) rotate(45deg);
}

button:hover #clip {
  animation: 0.2s ease-in-out 0.55s both greenLight8;
  --color: #27c39f;
}

@keyframes changeColor8 {
  from {
    background-color: #2781c3;
  }

  to {
    background-color: #27c39f;
  }
}

@keyframes lightEffect8 {
  from {
    box-shadow: 1px 1px 5px #27c39f;
  }

  to {
    box-shadow: 0 0 2px #27c39f;
  }
}

@keyframes greenLight8 {
  from {
  }

  to {
    box-shadow: inset 0px 0px 32px #27c39f;
  }
}

@keyframes leftArrow8 {
  from {
    transform: translate(0px);
  }

  to {
    transform: translateX(10px);
  }
}

@keyframes rightArrow8 {
  from {
    transform: translate(0px);
  }

  to {
    transform: translateX(-10px);
  }
}



@media (max-width: 560px){
    #container{
        grid-template-areas: 
            "nickname"
            "old-password "
            "password"
            "confirm-password";
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        height: 70vh;
        align-content: stretch;
    }
}

</style>