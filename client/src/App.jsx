import React, { useState } from "react"
import Product from "./pages/Product"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"

import "./App.css"
import Sidebar from "./components/sidebar/Sidebar"
import Topbar from "./components/topbar/Topbar"

//admin
import AdminUser from "./pages/user/User"
import AdminProduct from "./pages/product/Product"
import AdminUserList from "./pages/userList/UserList"
import AdminProductList from "./pages/productList/ProductList"
import AdminNewProduct from "./pages/newProduct/NewProduct"
import AdminNewUser from "./pages/newUser/NewUser"
import AdminOrdersList from "./pages/orders/OrdersList"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Success from "./pages/Success"
import { useSelector } from "react-redux"

const App = () => {
  const user = useSelector((state) => {
    return state.user.currentUser
  }) //extract current logged in user
  const [toggleAdmin, setToggleAdmin] = useState(false) // toggleAdmin state , to toggle between web app and admin dashboard
  return toggleAdmin ? (
    <Router> 
    {/* admin dashboard , only admin users can access this router*/}
      <Switch>
        <>
          <Topbar setToggleAdmin={setToggleAdmin} />
          <div className="container">
            <Sidebar />
            {/* <Route exact path="/">
              <Home setToggleAdmin={setToggleAdmin} />
            </Route> */}
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path="/users">
              <AdminUserList />
            </Route>
            <Route path="/products">
              <AdminProductList />
            </Route>
            <Route path="/user/:userId">
              <AdminUser />
            </Route>
            <Route path="/product/:productId">
              <AdminProduct />
            </Route>
            <Route path="/newproduct">
              <AdminNewProduct />
            </Route>
            <Route path="/newuser">
              <AdminNewUser />
            </Route>
            <Route path="/adminOrders">
              <AdminOrdersList />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  ) : (
    // normal web app without admin dashboard
    <Router>
      <Switch>
        <Route exact path="/">
          <Home setToggleAdmin={setToggleAdmin} />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
