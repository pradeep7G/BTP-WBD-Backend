import { createSlice } from "@reduxjs/toolkit"
import { logoutStart } from "./userRedux"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
    },
    modifyCart: (state, action) => {
      state.products = action.payload.products
      state.quantity = action.payload.quantity
      state.total = action.payload.total
    },
    setInitialState: (state, action) => {
      state.products = action.payload.products
      state.quantity = action.payload.quantity
      state.total = action.payload.total
    },
    setToZeroState: (state, action) => {
      state.products = []
      state.quantity = 0
      state.total = 0
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(logoutStart, (state, action) => {
      state.products = []
      state.quantity = 0
      state.total = 0
    })
  }
})

export const { addProduct, setInitialState, modifyCart,setToZeroState } = cartSlice.actions
export default cartSlice.reducer
