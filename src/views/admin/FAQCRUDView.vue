<template>
    <div class="header">
        <h1>FAQ</h1>
         <button class="button" type="button" v-if="admin">
            <span class="button__text">Add Question</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
          </button>
    </div>
    <div id="container">
        <article class="wrapper">
          <h2 class="question">Hola</h2>
          <div class="answer">Wow</div>
          <textarea name=""></textarea>
        </article>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          faq: [],
          admin: true
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
    justify-content: center;
    align-content: center;
    width: 80%;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.25rem;
}

#container .wrapper .answer{
    display: flex;
    padding: 1.5rem;
    width: 78%;
    border: 1px solid black;
    border-radius: 0 0 0.25rem 0.25rem;
    border-top: none;
}

textarea {
    width: 78%;
    resize: none;
    padding: 10px;
    border: 1px solid #ccc; 
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
    /* align-items: center;   */
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