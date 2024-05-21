import Api from "@/api/apiURL"

export const gameService = {
    // Create
    createGame: async (params) => {
        return Api.post(`/games`, params)
    },
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

    topTen: async () => {
        return Api.get('/games/top/')
    },

    // Update
    updateGame: async (params) => {
        return Api.patch(`/games/${params.game_id}`, params)
    },

    updateGameInfo: async (params) => {
        return Api.patch(`/games/info/${params.gameId}`, params.games_info)
    },

    // Delete
    deleteGame: async (params) => {
        return Api.delete(`/games/${params}`)
    }
}