import Api from "@/api/apiURL"

export const faqService = {
    // Create
    signIn: async (params) => {
        return Api.post(`/faq/`, params)
    },

    // Read
    logIn: async (params) => {
        return Api.post(`/faq/read`, params)
    },

    // Update
    userUpdateGame: async (params) =>{
        return Api.patch(`/faq/user_score/`, params)
    }
}