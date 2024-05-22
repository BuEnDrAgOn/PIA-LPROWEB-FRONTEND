import Api from "@/api/apiURL"

export const reportService = {
    countNewUsers: async () =>{
        return Api.get('/report/user_score')
    },

    countUserActivity: async() =>{
        return Api.get('/report/user_activity')
    },

    bestGame: async () =>{
        return Api.get('/report/bestgame')
    }
}