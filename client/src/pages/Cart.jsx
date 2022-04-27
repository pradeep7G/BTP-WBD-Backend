import { Add, Remove } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { mobile } from "../responsive"
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react"
import { userRequest } from "../requestMethods"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { setCartState, setCustomCartState } from "../redux/apiCalls"

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``

//design
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`

//cart page which consists of products added by user into the cart , and here we have access to checkout the products through stripe payment gateway

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [stripeToken, setStripeToken] = useState(null)
  const [cartData, setCartData] = useState(cart)
  const history = useHistory()
  const dispatch = useDispatch()
  const onToken = (token) => {
    setStripeToken(token)
  }

  //useEffect to set cart state
  useEffect(() => {
    user.currentUser && setCartState(dispatch, user)
  }, [dispatch, user])
  //useEffect to make stripe payment request
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500
        })
        history.push("/success", {
          stripeData: res.data,
          products: cart
        })
      } catch {}
    }
    stripeToken && makeRequest()
  }, [stripeToken, cart.total, history, cart])

  //handle click to set and modify cart
  const handleClick = (product) => {
    const filterProducts = cartData.products.filter(
      (prod) => prod._id !== product._id
    )
    const quantity = cartData.quantity - 1
    const total = cartData.total - product.price * product.quantity
    const modifiedCart = {
      products: filterProducts,
      quantity: quantity,
      total: total
    }
    setCustomCartState(dispatch, { user, modifiedCart })
    setCartData({
      products: filterProducts,
      quantity: quantity,
      total: total
    })
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <StripeCheckout
            name="Lama Shop"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
          {/* rendering cart products */}
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs. {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <PriceDetail>
                {/* delete option to delete cart product */}
                  <TopButton onClick={() => handleClick(product)}>
                    Delete
                  </TopButton>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          {/* Order Summary */}
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* stripe checkout */}
            <StripeCheckout
              name="AirShop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is Rs. ${cart.total}`}
              amount={cart.total * 10}
              token={onToken}
              stripeKey={KEY}
            >
            {/* checkout */}
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
