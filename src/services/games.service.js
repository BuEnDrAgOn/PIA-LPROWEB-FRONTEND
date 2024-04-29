import Api from "@/api/apiURL"

export const gameService = {
    getAllGames: async () => {
        return Api.get('/games')
    },
    getConsoleCategoryGames: async (params) =>{
        return Api.get(`/games/${params.consola}/${params.category}`)
    }
}