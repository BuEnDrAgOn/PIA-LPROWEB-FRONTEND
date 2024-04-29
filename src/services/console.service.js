import Api from "@/api/apiURL";

export const consoleService ={
    getConsoles: async () =>{
        return Api.get('/consoles')
    }
}