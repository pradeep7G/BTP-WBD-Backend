import styled from "styled-components"
import { mobile } from "../responsive"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { publicRequest } from "../requestMethods"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`
const Link = styled.a`
  margin: 5px 5px;
  font-size: 20px;
  text-decoration: underline;
  cursor: pointer;
`
//register page, where user register himself to our userbase
const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [fullname, setFullname] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [img, setImg] = useState("")
  const [confirm, setConfirm] = useState("")

  const history = useHistory()

  // handle submit and make request to the backend to create user
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log({
      username: username,
      email: email,
      password: password,
      address: address,
      fullname: fullname,
      phonenumber: phonenumber,
      img: img
    })
    if (confirm !== password) return 0
    try {
      const response = await publicRequest.post("/auth/register", {
        username: username,
        email: email,
        password: password,
        address: address,
        fullname: fullname,
        phonenumber: phonenumber,
        img: img
      })
      console.log(response)
      history.push("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {/* form to get registration information from the user */}
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Input
            placeholder="address (optional)"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="fullname (optional)"
            onChange={(e) => setFullname(e.target.value)}
          />
          <Input
            placeholder="phonenumber"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <Input placeholder="image link (optional)" onChange={(e) => setImg(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <div>
              <Link onClick={() => history.push("/login")}>Sign In</Link>
            </div>
          </Agreement>
          {/* submit register form */}
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
