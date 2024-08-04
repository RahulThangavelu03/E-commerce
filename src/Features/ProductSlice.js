



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: [{ Total: "" }],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
}

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GetProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(GetProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default ProductSlice.reducer;

export const GetProducts = createAsyncThunk('products/get', async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
});






