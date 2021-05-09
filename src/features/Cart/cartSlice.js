const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true
        },

        hideMiniCart(state) {
            state.showMiniCart = false 
        },

        addToCart(state, action) {
            const newProduct = action.payload
            const index = state.cartItems.findIndex(x => x.id === newProduct.id)

            if(index >= 0) {
                state.cartItems[index].quantity += newProduct.quantity 
            } else {
                state.cartItems.push(newProduct)
            }
        },

        removeCartItems(state, action) {
            const {idNeedToRemove} = action.payload
            state.cartItems = state.cartItems.filter(x => x.id === idNeedToRemove)
        },

        setQuantity(state, action) {
            const {id, quantity} = action.payload 
            const index = state.cartItems.findIndex(x => x.id === id)

            if(index >= 0) {
                state.cartItems[index].quantity = quantity
            }
        }
    }
})

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeCartItems } = actions;
export default reducer;
