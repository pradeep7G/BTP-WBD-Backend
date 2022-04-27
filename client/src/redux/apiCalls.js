import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart
} from "./userRedux"

import {
  addProduct as adProduct,
  setInitialState,
  modifyCart,
  setToZeroState
} from "./cartRedux"

import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess
} from "./productRedux"

import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} from "./usersRedux"

import { publicRequest } from "../requestMethods"

import axios from "axios"

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(res.data))
  } catch (err) {
    dispatch(loginFailure())
  }
}

export const logout = async (dispatch) => {
  dispatch(logoutStart())
  window.localStorage.removeItem("persist:root")
  console.log("logged out")
}

export const addToCart = async (dispatch, { updatedProduct, cart, user }) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  const cartProducts = cart.products
  let previousProduct = null
  const filteredProducts = cartProducts.filter((product) => {
    if (product._id === updatedProduct._id) previousProduct = product
    return product._id !== updatedProduct._id
  })

  if (filteredProducts.length === cartProducts.length) {
    const quantity = cart.quantity + 1
    const total = cart.total + updatedProduct.price * updatedProduct.quantity
    try {
      await axios.put(
        `/api/carts/${user.currentUser._id}`,
        {
          products: [...cartProducts, updatedProduct],
          quantity: quantity,
          total: total
        },
        { headers }
      )
      dispatch(adProduct(updatedProduct))
    } catch (err) {}
    console.log("apicall")
  } else {
    const quantity = cart.quantity
    const total =
      cart.total -
      previousProduct.price * previousProduct.quantity +
      updatedProduct.price * updatedProduct.quantity
    try {
      await axios.put(
        `/api/carts/${user.currentUser._id}`,
        {
          products: [...filteredProducts, updatedProduct],
          quantity: quantity,
          total: total
        },
        { headers }
      )
      const products = [...filteredProducts, updatedProduct]
      dispatch(modifyCart({ products, quantity, total }))
    } catch (err) {}
  }
}

export const setCartState = async (dispatch, user) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    const response = await axios.get(
      `/api/carts/find/${user.currentUser._id}`,
      { headers }
    )
    const products = response.data.products
    const quantity = response.data.quantity
    const total = response.data.total
    dispatch(setInitialState({ products, quantity, total }))
  } catch (err) {}
}
export const setCustomCartState = async (dispatch, { user, modifiedCart }) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    const response = await axios.put(
      `/api/carts/${user.currentUser._id}`,
      modifiedCart,
      { headers }
    )
    const products = response.data.products
    const quantity = response.data.quantity
    const total = response.data.total
    dispatch(modifyCart({ products, quantity, total }))
  } catch (err) {}
}

export const emptyCart = async (dispatch, user) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  await axios.put(
    `/api/carts/${user.currentUser._id}`,
    {
      products: [],
      quantity: 0,
      total: 0
    },
    { headers }
  )
  dispatch(setToZeroState())
}

export const getOrders = async (user) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  console.log("user: ", user)
  try {
    const response = await axios.get(
      `/api/orders/find/${user.currentUser._id}`,
      {
        headers
      }
    )
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductStart())
  try {
    const res = await publicRequest.get("/products")
    dispatch(getProductSuccess(res.data))
  } catch (err) {
    dispatch(getProductFailure())
  }
}

export const deleteProduct = async (id, dispatch, user) => {
  dispatch(deleteProductStart())
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    await axios.delete(`/api/products/${id}`, {
      headers
    })
    dispatch(deleteProductSuccess(id))
  } catch (err) {
    dispatch(deleteProductFailure())
  }
}

export const updateProduct = async (id, product, dispatch, user) => {
  dispatch(updateProductStart())
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    const res = await axios.put(
      `/api/products/${id}`,
      product,
      { headers }
    )
    console.log(res)
    dispatch(updateProductSuccess({ id, product }))
  } catch (err) {
    dispatch(updateProductFailure())
  }
}
export const addProduct = async (dispatch, user, product) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  dispatch(addProductStart())
  try {
    const res = await axios.post(
      `/api/products`,
      product,
      { headers }
    )
    dispatch(addProductSuccess(res.data))
  } catch (err) {
    dispatch(addProductFailure())
  }
}

export const getUsers = async (dispatch, user) => {
  dispatch(getUsersStart())
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    const res = await axios.get(`/api/users`, {
      headers
    })
    dispatch(getUsersSuccess(res.data))
  } catch (err) {
    console.log(err)
    dispatch(getUsersFailure())
  }
}

export const deleteUser = async (id, dispatch, user) => {
  dispatch(deleteUserStart())
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  try {
    await axios.delete(`/api/users/${id}`, {
      headers
    })
    dispatch(deleteUserSuccess(id))
  } catch (err) {
    dispatch(deleteUserFailure())
  }
}

export const updateUser = async (id, user, dispatch, adminUser) => {
  dispatch(updateUserStart())
  console.log(id, user, adminUser)
  const headers = {
    token: `Bearer ${adminUser.currentUser.accessToken}`
  }
  try {
    await axios.put(`/api/users/${id}`, user, { headers })
    dispatch(updateUserSuccess({ id, user }))
  } catch (err) {
    console.log(err)
    dispatch(updateUserFailure())
  }
}
export const addUser = async (dispatch, user, product) => {
  const headers = {
    token: `Bearer ${user.currentUser.accessToken}`
  }
  dispatch(addUserStart())
  try {
    const res = await axios.post(`/api/users`, product, {
      headers
    })
    dispatch(addUserSuccess(res.data))
  } catch (err) {
    dispatch(addUserFailure())
  }
}
