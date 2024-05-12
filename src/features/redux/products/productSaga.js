import { all, call, put, takeEvery } from "redux-saga/effects";
import { addProductsApi, getProductCardApi, getProductsApi, uploadFileApi } from "../../api/productsApi";
import { addProductsFailuer, addProductsSuccess,
    getProductsFailure, getProductsSuccess, 
    uploadFileSuccess, uploadFileFailure, 
    getProductCardSuccess,
    getProductCardFailure} from "./productSlice";

function* addProductSaga(action) {
    const response = yield call(addProductsApi,
        action.payload.name, 
        action.payload.code, 
        action.payload.price, 
        action.payload.unit,
        action.payload.brand_id,
        action.payload.category_id,
        action.payload.time_per_piece)
    if (response.status == 200 || response.status == 201) {
        yield put(addProductsSuccess(response.data))
    }
    else {
        yield put(addProductsFailuer({ 'error': response }))
    }
}

function* getProductSaga(action) {
    const response = yield call(getProductsApi, action.payload)
    //console.log(`the response is : ${JSON.stringify(response.data)}`);
    if(response.status == 200 || response.status == 201) {
        yield put(getProductsSuccess({'products': response.data.data, 'meta': response.data.meta}))
    } else {
        yield put(getProductsFailure({'error': response}))
    }
}

function* uploadFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadFileApi, formData)

    if(response.status == 200 || response.status == 201) {
        yield put(uploadFileSuccess(response.data))
    } else{
        yield put(uploadFileFailure({'error':response}))
    }
}

function* getProductCardSaga(action) {
    const response = yield call(getProductCardApi, action.payload)
    if(response.status == 200 || response.status == 201) {
        yield put(getProductCardSuccess({'products': response.data.data }))
    } else {
        yield put(getProductCardFailure({'error': response}))
    }
}


function* addProductsWatcherSaga() {
    yield takeEvery('products/addProductsFetch', addProductSaga)
}

function* getProductsWatcherSaga() {
    yield takeEvery('products/getProductsFetch', getProductSaga)
}

function* uploadFileWatcherSaga() {
    yield takeEvery('products/uploadFileFetch', uploadFileSaga)
}

function* getProductCardWatcherSaga() {
    yield takeEvery('products/getProductCardFetch', getProductCardSaga)
}

export default function* ProductsSaga() {
    yield all([
        addProductsWatcherSaga(),
        getProductsWatcherSaga(),
        uploadFileWatcherSaga(),
        getProductCardWatcherSaga(),
    ])
}

