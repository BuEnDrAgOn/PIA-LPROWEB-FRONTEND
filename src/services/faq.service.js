import Api from "@/api/apiURL"

export const faqService = {

    // Create
    createFAQ: async (params) => {
        return Api.post('/faq', params)
    },

    // Read
    getAllFAQ: async () =>{
        return Api.get('/faq')
    },

    // Update
    updateFAQ: async(params) => {
        return Api.patch(`/faq/${params.fqa_id}`, params)
    },

    // Delete
    deleteFAQ: async (params) => {
        return Api.delete(`/faq/${params}`)
    },

// Read all User Questions
    getUserQuestions: async () => {
        return Api.get('/users/user_question/')
    },

    deleteUserQuestion: async (params) => {
        return Api.delete(`/users/user_question/${params}`)
    }
}