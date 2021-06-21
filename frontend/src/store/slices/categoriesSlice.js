import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesError: false,

    category: null,
    categoryLoading: false,
    categoryError: false,

    updateCategoryLoading: false,
    updateCategoryError: false,

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
        //////////////////////////////////SET CATEGORIES
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
        ///////////////////////////////////SET CATEGORY
        fetchCategoryRequest: state => {
            state.categoryLoading = true;
        },
        fetchCategorySuccess: (state, {payload: category}) => {
            state.categoryLoading = false;
            state.category = category;
        },
        fetchCategoryFailure: (state, payload) => {
            state.categoryLoading = false;
            state.categoryError = payload;
        },
        ///////////////////////////////////UPDATE CATEGORY
        updateCategoryRequest: state => {
            state.updateCategoryLoading = true;
        },
        updateCategorySuccess: state => {
            state.updateCategoryLoading = false;
        },
        updateCategoryFailure: (state, payload) => {
            state.updateCategoryError = payload;
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