import Api from "@/api/apiURL"

export const gameService = {
    // Create

    // Read
    getAllGames: async () => {
        return Api.get('/games')
    },
    getConsoleCategoryGames: async (params) =>{
        return Api.get(`/games/${params.consola}/${params.category}`)
    },
    getGame: async (params) => {
        return Api.get(`/games/game/${params.game}`)
    },

    // Update
    updateGame: async (params) => {
        return Api.patch(`/games/${params.game_id}`, params)
    },

    // Delete
    deleteGame: async (params) => {
        return Api.delete(`/games/${params}`)
    }
}