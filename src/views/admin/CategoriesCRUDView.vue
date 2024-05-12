<template>
    <h1>Admin Category</h1>
    <div class="wrapper">
         <button class="button" type="button" @click="addCategory()">
            <span class="button__text">Add category</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
        </button>
        <!-- Search -->
        <form class="form" onsubmit = "return false">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <input class="input" placeholder="category name" type="text" v-model="search">
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
                    <th>category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <TransitionGroup>
                    <tr v-for="category in searchList" :key="category">
                        <td>
                            <div class="input-container">
                                <input class="input" name="text" type="text" :value='category.category' @input="category.category = $event.target.value">
                                <label class="label" for="input">category Name</label>
                                <div class="topline"></div>
                                <div class="underline"></div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button class="update" @click="typeof category.category_id == 'string' ? createCategory(category) : updateCategory(category)" :style="{'background': typeof category.category_id == 'string' ? '#00BD7E' : null}">
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

                                <button class="bin-button" @click="deleteCategory(category.category_id)">
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
import { categoriesService } from '@/services'
import { v4 as uuidv4 } from 'uuid'
export default {
    data(){
        return{
            category: null,
            search: '',
        }
    },
    methods:{
        async getCategory(){
          await categoriesService.getAllCategories().then(response =>{
              this.category = response.data
          })
        },

        async updateCategory(category){
          await categoriesService.updateCategory(category)
        },

        async deleteCategory(categoryId){
          if(typeof categoryId != 'string'){
              await categoriesService.deleteCategory(categoryId).then(() =>{
                  this.category = this.category.filter(category => category.category_id !== categoryId)
              })
          } else{
              this.category = this.category.filter(category => category.category_id !== categoryId)
          }
        },

        // Add category
        addCategory(){
            const emptyCategory = {
                category_id: uuidv4(),
                category: '',
            }

            this.category.unshift(emptyCategory)
            this.$refs.container.scrollTo({
                top: this.$refs.thead.offsetTop,
                behavior: 'smooth'
            })
        },

        createCategory(category){
            categoriesService.createCategory(category).then(response => {
                const index = this.category.findIndex(obj => obj.category_id === category.category_id);
                if (index !== -1) {
                  this.category[index].category_id = response.data.category_id;
                }
            })
        }
    },

    mounted(){
      this.getCategory()
    },

    computed:{
    searchList(){
      if(this.category !== null){
        return this.category.filter(category => category.category.toLowerCase().includes(this.search.toLowerCase()))
      }else{
        return this.category
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
  width: 10%;
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
  transform: translateX(20%);
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