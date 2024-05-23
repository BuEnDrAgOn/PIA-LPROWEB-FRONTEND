import Api from "@/api/apiURL"

export const userService = {
    // Create
    signIn: async (params) => {
        return Api.post(`/users/`, params)
    },

    // Read
    logIn: async (params) => {
        return Api.post(`/users/read`, params)
    },

    update: async (params) => {
        return Api.patch(`/users/`, params)
    },

// gameScore
    // Read
    userGameRated: async (params) =>{
        return Api.get(`/users/user_score/?gameId=${params.gameId}&userId=${params.userId}`)
    },

    // Update
    userUpdateGame: async (params) =>{
        return Api.patch(`/users/user_score/`, params)
    },

    // User_Questions
    createUserQuestion: async (params) => {
        return Api.post('/users/user_question/', params)
    }
}