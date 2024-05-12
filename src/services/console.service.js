import Api from "@/api/apiURL";

export const consoleService ={
    // Create
    createConsole: async (params) => {
        return Api.post('/consoles', params)
    },

    // Read
    getConsoles: async () =>{
        return Api.get('/consoles')
    },

    // Update
    updateConsole: async(params) => {
        return Api.patch(`/consoles/${params.console_id}`, params)
    },

    // Delete
    deleteConsole: async (params) => {
        return Api.delete(`/consoles/${params}`)
    }
}