
import categoriesSlice from "../slices/categoriesSlice";

export const {
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure,

    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,

    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure,
} = categoriesSlice.actions;