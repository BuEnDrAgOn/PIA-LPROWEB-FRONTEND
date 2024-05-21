<template>
    <h1>User's Questions</h1>
    <div id="container">
        <TransitionGroup>
            <div v-for="question in questions" :key="question.question_id">
                <fieldset>
                    <span id="delete" @click="deleteUserQuestion(question.question_id)">×</span>
                    <legend>{{question.users.user_email}}</legend>
                    {{question.question_info}}
                </fieldset>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { faqService } from '@/services'
export default {
    data(){
        return {
            questions: []
        }
    },

    methods:{
        getUserQuestions(){
            faqService.getUserQuestions().then(res => {
                this.questions = res.data
            })
        },

        deleteUserQuestion(questionId){
            faqService.deleteUserQuestion(questionId).then(() => {
                this.questions = this.questions.filter(question => question.question_id !== questionId)
            })
        }
    },

    mounted(){
        this.getUserQuestions()
    }
}

</script>

<style scoped>

.v-enter-from{
    transform: translateX(-30%);
}

.v-leave-to{
    transform: translateX(30%);
    opacity: 0;
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


#container div {
    position: relative;
    display: flex;
    width: 60%;
    padding: 1rem;
    box-shadow: 0 0 10px 3px rgba(90, 88, 88, 0.171);
    align-self: center;
    border-radius: 5px;
    transition: all 0.3s;
}

fieldset #delete{
    display: flex;
    align-items: center;
    line-height: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);

    font-size: 2rem;
    height: 1.5rem;
    padding: 0.5rem;
    padding-bottom: 0.85rem;
    border: 1px solid rgba(0, 0, 0, 0.527);
    border-radius: 5px;
    background: white;
    color: red;
    transition: all 0.3s;
}

#delete:hover{
    background: red;
    border: none;
    color: white;
}

fieldset {
    display: flex;
    flex: 1 1;
    border-radius: 5px;
}

fieldset > legend {
    border: 1px solid rgba(0, 0, 0, 0.623);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.623);
    color: white;
}

h1{
    padding-left: 2rem;
    font-style: italic;
}

</style>