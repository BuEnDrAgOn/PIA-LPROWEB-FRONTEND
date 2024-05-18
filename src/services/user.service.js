import Api from "@/api/apiURL"

export const userService = {
    // Create
    signIn: async (params) => {
        return Api.post(`/users/`, params)
    },

    // Read
    logIn: async (params) => {
        return Api.post(`/users/read`, params)
    }
}