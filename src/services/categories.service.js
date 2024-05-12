import Api from "@/api/apiURL"

export const categoriesService = {

    // Create
    createCategory: async (params) => {
        return Api.post('/categories', params)
    },

    // Read
    getAllCategories: async () =>{
        return Api.get('/categories')
    },

    // Update
    updateCategory: async(params) => {
        return Api.patch(`/categories/${params.category_id}`, params)
    },

    // Delete
    deleteCategory: async (params) => {
        return Api.delete(`/categories/${params}`)
    }

}