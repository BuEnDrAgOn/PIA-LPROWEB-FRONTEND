import Api from "@/api/apiURL"

export const gameService = {
    getGames: async () => {
        return Api.get('/games')
    }
}