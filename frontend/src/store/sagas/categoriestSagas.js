import axiosApi from "../../axiosApi";
import {
    createCategoryRequest,
    createCategorySuccess, deleteCategoryRequest, deleteCategorySuccess,
    fetchCategoriesRequest,
    fetchCategoriesSuccess
} from "../actions/categoriesActions";
import {put, takeEvery} from "redux-saga/effects";
import {historyPush} from "../actions/historyActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchCategories() {
    try {
        const categoriesResponse = yield axiosApi.get('/categories');
        yield put(fetchCategoriesSuccess(categoriesResponse.data));
    } catch (err) {

    }
}

export function* createCategory({payload: category}) {
    try {
        const categoryResponse = yield axiosApi.post('/categories', category);
        yield put(createCategorySuccess(categoryResponse.data));
        yield put(addNotification({message: 'create successful', options: {variant: 'success'}}));
        yield put(historyPush('/'));
    } catch (err) {

    }
}

export function* deleteCategory({payload: categoryId}) {
    try {
        yield axiosApi.delete('/categories' + categoryId);
        yield put(deleteCategorySuccess());
        yield put(historyPush('/'));
        yield fetchCategories();
    } catch (err) {

    }
}

const categorySagas = [
    takeEvery(fetchCategoriesRequest, fetchCategories),
    takeEvery(createCategoryRequest, createCategory),
    takeEvery(deleteCategoryRequest, deleteCategory)
]

export default categorySagas;