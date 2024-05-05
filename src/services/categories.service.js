import Api from "@/api/apiURL"

export const categoriesService = {
    getAllCategories: async () =>{
        return Api.get('/categories')
    }
}