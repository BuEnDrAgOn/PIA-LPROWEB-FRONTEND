<template>
    <div class="header">
        <h1>FAQ</h1>
         <button class="button" type="button" v-if="admin">
            <span class="button__text">Add Question</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
          </button>
    </div>
    <div id="container">
        <article class="wrapper" v-for="faq in faqs" :key="faq.fqa_id">
          <input type="text" class="question" v-if="admin" :value="faq.fqa_title" @change="faq.fqa_title = $event.target.value">
          <h2 class="question" v-else @click="toggleAnswer(faq.fqa_id)" :class="{'show': visibleAnswer[faq.fqa_id]}">{{faq.fqa_title}}</h2>
          <textarea name="" v-if="admin" :value="faq.fqa_answer" @change="faq.fqa_answer = $event.target.value"/>
          <div class="answer answer-user" v-else :class="{'show': visibleAnswer[faq.fqa_id]}">{{faq.fqa_answer}}</div>
        </article>
    </div>
</template>

<script>
import { faqService } from '@/services'
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
            console.log(res.data)
            this.faqs = res.data
          })
        },

        toggleAnswer(fqaID){
          this.visibleAnswer[fqaID] = !this.visibleAnswer[fqaID]
        }
      },

      mounted(){
        this.getFAQ()
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


textarea {
    width: 78%;
    resize: none;
    padding: 10px;
    border: 1px solid #ccc; 
    border-top: none;
    border-radius: 5px; 
    color: #333; 
    background-color: #f4f4f4; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
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

</style>