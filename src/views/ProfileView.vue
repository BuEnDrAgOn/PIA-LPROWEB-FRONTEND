<template>
    <h1>Character</h1>
    <div id="container" class="row">
        <div class="col-6">
            <h2>Nickname</h2>
            <div class="input-container">
                <input class="input" name="text" type="text"  v-model="profile.name">
                <label class="label" for="input">Name</label>
                <!-- <div class="topline"/>
                <div class="underline"/> -->
            </div>
        </div>
        <div class="col-6">
            <h2>Title</h2>
            <div class="input-container">
                <input class="input" name="text" type="text" v-model="profile.last_name">
                <label class="label" for="input">Last Name</label>
                <!-- <div class="topline"/>
                <div class="underline"/> -->
            </div>
        </div>
        <div class="col-6">
            <h2>Old Runes</h2>
            <div class="input-container">
                <input class="input password" name="text" type="text" v-model="profile.password">
                <label class="label" for="input">Old Password</label>
                <!-- <div class="topline"/>
                <div class="underline"/> -->
            </div>
        </div>
        <div class="col-6">
            <h2>New Runes</h2>
            <div class="input-container">
                <input class="input password" name="text" type="text" v-model="newPassword">
                <label class="label" for="input">New Password</label>
                <!-- <div class="topline"/>
                <div class="underline"/> -->
            </div>
        </div>
        <div class="col-6">
            <h2>Confirm New Runes</h2>
            <div class="input-container">
                <input class="input password" name="text" type="text" v-model="confirmNewPassword">
                <label class="label" for="input">Confirm New Password</label>
                <!-- <div class="topline"/>
                <div class="underline"/> -->
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { jwtDecode } from 'jwt-decode';

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

.password { 
    font-family: norseFont !important
}

#container{
    display: flex;
    flex-flow: column;
    align-items: center;
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

</style>