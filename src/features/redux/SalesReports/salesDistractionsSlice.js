import { createSlice } from "@reduxjs/toolkit";

const salesDistractionsSlice = createSlice({
    name: 'salesDistractions',
    initialState: {
        loading: false,
        salesDistractions: [],
        error: null,
        message: null,
    },

    reducers: {
        getExportSalesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.salesDistractions = []
        },

        getExportSalesSuccess: (state, action) => {
            state.loading = false;
            state.salesDistractions = action.payload;
            state.message = action.payload.message;
            state.error = null;
        },

        getExportSalesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.message = null;
            state.salesDistractions = []
        },

        resetData_distractions: (state) => {
            state.message = null;
            state.error = null;
        },

        //-----------------------Local-Sales----------------------
        getLocalSalesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        getLocalSalesSuccess: (state, action) => {
            state.loading = false;
            state.salesDistractions = action.payload;
            state.message = action.payload.message;
            state.error = null;
        },

        getLocalSalesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.message = null;
        },

        //-----------------------------TotalReport---------------
        getTotalSalesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        getTotalSalesSuccess: (state, action) => {
            state.loading = false;
            state.salesDistractions = action.payload;
            state.message = action.payload.message;
            state.error = null;
        },

        getTotalSalesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.message = null;
        },
    }
})

export const {
    getExportSalesStart, getExportSalesSuccess, getExportSalesFailure, resetData_distractions,
    getLocalSalesFailure, getLocalSalesSuccess, getLocalSalesStart,
    getTotalSalesStart, getTotalSalesFailure, getTotalSalesSuccess
} = salesDistractionsSlice.actions;

export default salesDistractionsSlice.reducer;