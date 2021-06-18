import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesError: false,

    createCategoryLoading: false,
    createCategoryError: false,

    deleteCategoryLoading: false,
    deleteCategoryError: false,
}

const name = "categories";

const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCategoriesRequest: state => {
            state.categoriesLoading = true;
        },
        fetchCategoriesSuccess: (state, {payload: categories}) => {
            state.categoriesLoading = false;
            state.categories = categories;
        },
        fetchCategoriesFailure: (state, payload) => {
            state.categoriesError = payload;
            state.categoriesLoading = false;
        },
        ///////////////////////////////CREATE
        createCategoryRequest: state => {
            state.createCategoryLoading = true;
        },
        createCategorySuccess: state => {
            state.createCategoryLoading = false;
        },
        createCategoryFailure: (state, payload) => {
            state.createCategoryError = payload;
            state.createCategoryLoading = false;
        },
        ///////////////////////////////DELETE
        deleteCategoryRequest: state => {
            state.createCategoryLoading = true;
        },
        deleteCategorySuccess: state => {
            state.deleteCategoryLoading = false;
        },
        deleteCategoryFailure: (state, payload) => {
            state.deleteCategoryError = payload;
            state.deleteCategoryLoading = false;
        }
    }
});

export default categoriesSlice;