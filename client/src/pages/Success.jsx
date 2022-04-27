import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { useHistory } from "react-router-dom"
import { emptyCart } from "../redux/apiCalls"
import axios from "axios"

//Success components which shows up when a payment checkout is succeeded
const Success = () => {
  const location = useLocation()
  const data = location.state.stripeData
  const cart = location.state.products
  const currentUser = useSelector((state) => state.user.currentUser)
  const [orderId, setOrderId] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //userEffect to confirm stripe payment
  useEffect(() => {
    const createOrder = async () => {
      const headers = {
        token: `Bearer ${user.currentUser.accessToken}`
      }
      try {
        const res = await axios.post(
          `http://localhost:5000/api/orders`,
          {
            userId: currentUser._id,
            products: cart.products,
            amount: cart.total,
            address: data.billing_details.address
          },
          { headers }
        )
        setOrderId(res.data._id)
      } catch (err) {
        console.log(err)
      }
    }
    data && createOrder()
    user.currentUser && emptyCart(dispatch, user)
  }, [cart, data, currentUser, user, dispatch])

  return (
    // render success page
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={() => history.push("/cart")}
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default Success
