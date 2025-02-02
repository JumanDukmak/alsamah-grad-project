import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
    name: "sales",
    initialState: {
        sales: [],
        expect_Sales:[],
        isLoading: false,
        done: false,
        id: 0,
        error: null,
        message: null,
    },

    reducers: {
        resetData_sales: (state) => {
            state.message = null;
            state.error = null;
        },

        //uploud file to add sales from excel
        uploadSalesFileFetch: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadSalesFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.sales.push(action.payload.data);
            state.done = true;
            state.message = action.payload.message;
        },
        
        uploadSalesFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },
        uploadExpectSalesFileFetch: (state) => {
            console.log(`helloooooooo`)
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.done = false;
        },
        
        uploadExpectSalesFileSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            //state.expect_Sales.push(action.payload.data);
            state.done = true;
            console.log(`msg is ${action.payload.message}`)
            state.message = action.payload.message;
        },
        
        uploadExpectSalesFileFailure: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.error = action.payload.error;
            state.done = false;
        },
    },
});

export const { 
    uploadSalesFileFetch,
    uploadSalesFileSuccess,
    uploadSalesFileFailure,
    uploadExpectSalesFileFetch,
    uploadExpectSalesFileSuccess,uploadExpectSalesFileFailure,
    resetData_sales
} = salesSlice.actions;
export default salesSlice.reducer;
