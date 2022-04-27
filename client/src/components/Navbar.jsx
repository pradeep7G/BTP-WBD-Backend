import { Badge } from "@material-ui/core"
import {
  Search,
  ShoppingCartOutlined,
  BookmarksOutlined
} from "@material-ui/icons"
import React, { useState } from "react"
import styled from "styled-components"
import { mobile } from "../responsive"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/apiCalls"

//Designing

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

//navbar compoent , consists of navigation links to admin dashbaord page, products category page, cart page, orders page

const Navbar = ({ setToggleAdmin }) => {
  const [search, setSearch] = useState("")
  const quantity = useSelector((state) => state.cart.quantity)
  const user = useSelector((state) => {
    return state.user.currentUser
  })
  const history = useHistory()
  const dispatch = useDispatch()
  //handling logout
  const handleLogout = async (e) => {
    e.preventDefault()
    logout(dispatch)
  }
  //handling submit
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/products/${search}`)
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <form onSubmit={handleSubmit}>
            <SearchContainer>
              <Input
                placeholder="Search Products"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </form>
        </Left>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Center>
            <Logo>AirShop.</Logo>
          </Center>
        </Link>
        <Right>
          {user ? (
            <>
              <MenuItem>{user.username}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              {user.isAdmin ? (
                <MenuItem
                  onClick={() => {
                    setToggleAdmin(true)
                    history.push("/users")
                  }}
                >
                  Admin
                </MenuItem>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {" "}
              {/* link to register */}
              <MenuItem onClick={() => history.push("/register")}>
                REGISTER
              </MenuItem>
              {/* link to sign in */}
              <MenuItem onClick={() => history.push("/login")}>
                SIGN IN
              </MenuItem>
            </>
          )}

          {/* //link to cart page */}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {/* //link to orders page */}
          <Link to="/orders">
            <MenuItem>
              <Badge color="primary">
                <BookmarksOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
