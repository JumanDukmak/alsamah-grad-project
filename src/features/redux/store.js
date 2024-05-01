import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import productSlice from './products/productSlice';
import countriesSlice from './Country/countriesSlice';
import areasSlice from './Area/areasSlice';
import salesPersonSlice from './SalesPerson/salesPersonSlice';
import categoriesSlice from './Category/categoriesSlice';
import brandsSlice from './Brands/brandsSlice';
import shopsSlice from './Shops/shopsSlice';
import salesDistractionsSlice from './SalesReports/salesDistractionsSlice';
import salesSlice from './Sales/salesSlice';
import salesChartsSlice from './SalesReports/salesChartsSlice';
import IndustrialExpenseSlice from './Indirect_IndustrialExpense/IndustrialExpenseSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    products: productSlice,
    shops: shopsSlice,
    countries: countriesSlice,
    areas: areasSlice,
    salesPersons: salesPersonSlice,
    brands: brandsSlice,
    categories: categoriesSlice,
    salesDistraction: salesDistractionsSlice,
    sales: salesSlice,
    salesCharts: salesChartsSlice,
    IndustrialExpense:IndustrialExpenseSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: ()=>[sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

