<template>
    <div class="row">
        <h1>Character</h1>

        <button class="button" type="button" @click="saveCharacter">
            <span class="button__text">Save Character</span>
        </button>  
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
                <input class="input password" name="text" type="text" v-model="profile.password" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">Old Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
        <div>
            <h2>New Runes</h2>
            <div class="input-container">
                <input class="input password" name="text" type="text" v-model="newPassword" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">New Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
        <div>
            <h2>Confirm New Runes</h2>
            <div class="input-container">
                <input class="input password" name="text" type="text" v-model="confirmNewPassword" @focus="labelWidth($event.target)" @blur="resetLabelWidth($event.target)" autocomplete="off">
                <label class="label" for="input">Confirm Password</label>
                <div class="topline"/>
                <div class="underline"/>
            </div>
        </div>
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
            confirmNewPassword: null
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
            console.log('Entra');
            if(this.newPassword == this.confirmNewPassword) {
                console.log('Si son las contraseñas.');
                const user = {
                    old_password: this.profile.password,
                    new_password: this.newPassword,
                    user_email: localStorage.getItem('email'),
                    user_name: this.profile.name
                }

                if(!this.profile.password) {
                    console.log('No hay contraseña.');
                    // this.errors.logIn.credentials = 'Escriba su contraseña'
                } else{
                    console.log('Actualizar');
                    // this.errors.signIn.credentials = null
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
                        // this.errors.logIn.credentials = 'Credenciales incorrectas'
                    })
                }
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