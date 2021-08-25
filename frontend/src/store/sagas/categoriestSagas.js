import axiosApi from "../../axiosApi";
import {
    createCategoryRequest,
    createCategorySuccess, deleteCategoryRequest, deleteCategorySuccess,
    fetchCategoriesRequest,
    fetchCategoriesSuccess, fetchCategoryRequest, fetchCategorySuccess, updateCategoryRequest, updateCategorySuccess
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
        yield put(historyPush('/categories'));
    } catch (err) {

    }
}

export function* deleteCategory({payload: data}) {
    try {
        if (data.transactionsToCategory) {
            yield axiosApi.delete(`/categories/${data.deleteCategory}/${data.transactionsToCategory}`);
        } else {
            yield axiosApi.delete(`/categories/${data.deleteCategory}`);
        }
        yield put(deleteCategorySuccess());
        yield put(historyPush('/categories'));
        yield fetchCategories();
    } catch (err) {

    }
}

export function* fetchCategory({payload: categoryId}) {
    try {
        const category = yield axiosApi.get('/categories/' + categoryId);
        yield put(fetchCategorySuccess(category.data));
        // yield put(historyPush('/'));
        // yield fetchCategories();
    } catch (err) {

    }
}

export function* updateCategory({payload: data}) {
    try {
        yield axiosApi.put('/categories/' + data.id, data.formData);
        yield put(updateCategorySuccess());
        yield put(historyPush('/categories'));
        yield fetchCategories();
    } catch (err) {

    }
}

const categorySagas = [
    takeEvery(fetchCategoriesRequest, fetchCategories),
    takeEvery(createCategoryRequest, createCategory),
    takeEvery(deleteCategoryRequest, deleteCategory),
    takeEvery(fetchCategoryRequest, fetchCategory),
    takeEvery(updateCategoryRequest, updateCategory),
]

export default categorySagas;