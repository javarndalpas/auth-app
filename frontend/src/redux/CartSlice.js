import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: [],
        total: 0
    },
    reducers: {
        add(state, action) {
            const updatedCartList = state.cartList.concat(action.payload);
            const updatedTotal = state.total + action.payload.price;
            // console.log(action.payload);
            return { cartList: updatedCartList, total: updatedTotal }
        },
        remove(state, action) {
            console.log(action,"action")
            const updatedCartList = state.cartList.filter(item => item._id !== action.payload);
            const updatedTotal = state.total - action.payload.price;
            return { total: updatedTotal, cartList: updatedCartList }
        }
    }
})
export const { add, remove } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;