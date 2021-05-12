const { createSlice } = require('@reduxjs/toolkit');

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        productNameNeedToSearch: "",
    },
    reducers: {
        searchNameProduct(state, action) {
            const {productName} = action.payload
            if(productName !== "") {
                state.productNameNeedToSearch = productName
            }
        },
    }
})

const { actions, reducer } = searchSlice;
export const { searchNameProduct } = actions;
export default reducer;
