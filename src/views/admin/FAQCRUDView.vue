<template>
    <div class="header">
        <h1>FAQ</h1>
         <button class="button" type="button" v-if="admin" @click="addQuestion()">
            <span class="button__text">Add Question</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
          </button>
    </div>
    <div id="container">
      <TransitionGroup>
        <article class="wrapper" v-for="faq in faqs" :key="faq">
          <input type="text" class="question" v-if="admin" :value="faq.fqa_title" @change="faq.fqa_title = $event.target.value">
          <h2 class="question question-user" v-else @click="toggleAnswer(faq.fqa_id)" :class="{'show': visibleAnswer[faq.fqa_id]}">{{faq.fqa_title}}</h2>
          <textarea name="" v-if="admin" :value="faq.fqa_answer" @change="faq.fqa_answer = $event.target.value" @input="reziseTextArea($event.target)"/>
          <div v-if="admin" id="actions">
            <button type="button" class="button" @click="typeof faq.fqa_id == 'string' ? createFAQ(faq) : updateFAQ(faq)">
              <span class="button__text">{{typeof faq.fqa_id == 'string' ? 'Create' : 'Save'}}</span>
              <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
            <button class="noselect" @click="deleteFAQ(faq.fqa_id)"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
          </div>
          <div class="answer answer-user" v-else :class="{'show': visibleAnswer[faq.fqa_id]}">{{faq.fqa_answer}}</div>
        </article>
      </TransitionGroup>
    </div>
</template>

<script>
import { faqService } from '@/services' 
import { v4 as uuidv4 } from 'uuid'
import { jwtDecode } from 'jwt-decode'

    export default {
      data(){
        return {
          faqs: [],
          admin: false,

          visibleAnswer: {}
        }
      },

      methods:{
        getFAQ(){
          faqService.getAllFAQ().then((res) =>{
            this.faqs = res.data
          })
        },

        toggleAnswer(fqaID){
          this.visibleAnswer[fqaID] = !this.visibleAnswer[fqaID]
        },

        reziseTextArea(element){
          element.style.height = 'auto',
          element.style.height = element.scrollHeight + 'px'
        },

        addQuestion(){
          const emptyFAQ = {
            fqa_id: uuidv4(),
            fqa_title: '',
            fqa_answer: '',
            fqa_user: jwtDecode(localStorage.getItem('token')).user_id
          }
          this.faqs.unshift(emptyFAQ)
        },

        async createFAQ(question){
          await faqService.createFAQ(question).then(res =>{
             const index = this.faqs.findIndex(obj => obj.fqa_id === question.fqa_id);
                if (index !== -1) {
                    this.faqs[index].fqa_id = res.data.fqa_id;
                }
          })
        },

        async updateFAQ(question){
          await faqService.updateFAQ(question)
        },

        async deleteFAQ(faqId){
            if(typeof faqId != 'string'){
                await faqService.deleteFAQ(faqId).then(() =>{
                    this.faqs = this.faqs.filter(faq => faq.fqa_id !== faqId)
                })
            } else{
                this.faqs = this.faqs.filter(faq => faq.fqa_id !== faqId)
            }
        },
      },

      mounted(){
        this.getFAQ()

        if(localStorage.getItem('token')){
          const payload = jwtDecode(localStorage.getItem('token'));
          if(payload.roles.role_name === 'admin'){
            this.admin = true
          }
        }
      }
    }
</script>

<style scoped>
#container{
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 3rem 0;
    height: 93%;
    width: 100%;
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

#container .wrapper{
  display: flex;
  flex-flow: wrap column;
  align-content: center;
  align-items: center;
  width: 100%;
  transition: all 0.3s;
}

#container .wrapper .question{
    display: flex;
    position: relative;
    flex-flow: wrap column;
    font-size: 1.5rem;
    align-content: flex-start;
    width: 80%;
    padding: 1rem 1.5rem;
    border: 1px solid black;
    border-radius: 0.25rem;
}

.question::after{
  content: '\27A4';
  position: absolute;
  padding: 0.5rem;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(-270deg);
  transition: all 0.3s;
}

.question.show::after{
  transform: translateY(-50%) rotate(270deg);;
}

.question-user{
  cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
  animation: cursor 0.4s linear infinite;
}


#container .wrapper .answer{
    display: flex;
    padding: 1.5rem;
    width: 78%;
    border: 1px solid black;
    border-radius: 0 0 0.25rem 0.25rem;
    border-top: none;
    overflow: hidden;
    transition: all 0.3s;
}

#container .wrapper .answer-user{
  height: 0;
  padding: 0 1.5rem;
  border-width: 0;
}

#container .wrapper .answer-user.show{
  border-width: 1px;
  border-radius: 0 0 0.25rem 0.25rem;
  padding: 1.5rem;
  height: auto;
}

.v-enter-from{
    transform: translateX(-30%);
}

.v-leave-to{
    transform: translateX(30%);
    opacity: 0;
}

textarea {
    width: 78%;
    resize: none;
    padding: 10px;
    border: 1px solid #ccc; 
    border-top: none;
    border-radius: 5px; 
    color: #333; 
    background-color: #f4f4f4; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow: hidden;
}

textarea:focus {
    outline-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
}


.header{
    display: flex;
    justify-content: space-between;
    padding-left: 2rem;
    font-style: italic;
}

/* Add Item */
.button {
  --main-focus: #2d8cf0;
  --font-color: #323232;
  --bg-color-sub: #eee;
  --bg-color: #fff;
  --main-color: #323232;
  position: relative;
  width: 155px;
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

/* Actions */
/* Create */
#actions .button {
  position: relative;
  width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
  overflow: hidden;
}

#actions .button, .button__icon, .button__text {
  transition: all 0.3s;
}

#actions .button .button__text {
  transform: translateX(40px);
  color: #fff;
  font-weight: 600;
}

#actions .button .button__icon {
  position: absolute;
  height: 100%;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
}

#actions .button .svg {
  width: 30px;
  stroke: #fff;
}

#actions .button:hover {
  background: #34974d;
}

#actions .button:hover .button__text {
  color: transparent;
}

#actions .button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

#actions .button:active .button__icon {
  background-color: #2e8644;
}

#actions .button:active {
  border: 1px solid #2e8644;
}
/* Delete */
#actions{
  display: flex;
  margin-right: 1rem;
  align-self: flex-end;
  margin-top: 0.5rem;
}
#actions button {
 position: relative;
 width: 150px;
 height: 50px;
 cursor: pointer;
 display: flex;
 align-items: center;
 background: red;
 border: none;
 border-radius: 5px;
 box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
 background: #e62222;
 cursor: url('@/assets/cursors/frames/frame1.gif'), auto;
 animation: cursor 0.4s linear infinite;
}

#actions button, button span {
 transition: 200ms;
}

#actions button .text {
 transform: translateX(35px);
 color: white;
 font-weight: bold;
}

#actions button .icon {
 position: absolute;
 border-left: 1px solid #c41b1b;
 transform: translateX(110px);
 height: 40px;
 width: 35px;
 display: flex;
 align-items: center;
 justify-content: center;
}

#actions button svg {
 width: 15px;
 fill: #eee;
}

#actions button:hover {
 background: #ff3636;
}

#actions button:hover .text {
 color: transparent;
}

#actions button:hover .icon {
 width: 150px;
 border-left: none;
 transform: translateX(0);
}

#actions button:focus {
 outline: none;
}

#actions button:active .icon svg {
 transform: scale(0.8);
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

@media (max-width: 400px){
  .button{
    margin-right: 0;
  }
}
</style>