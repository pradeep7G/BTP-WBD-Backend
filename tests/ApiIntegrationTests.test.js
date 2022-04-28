const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../index.js")
const Product = require("../models/Product")
const User = require("../models/User")

const api = supertest(app)
jest.setTimeout(10000) 
let AuthToken = null   
const initialProducts = [
  {
    title: "Dhingra Men's Regular Fit Bandhgala Jodhpuri Style Blazer",
    desc:
      "Trendy and appealing, this shirt from FUNDAY FASHION exclusive collect...",
    img: "https://m.media-amazon.com/images/I/5147Msr1aXL._UL1080_.jpg",
    categories: ["men", "women"],
    size: ["M", "L", "XL"],
    color: ["black"],
    price: 3000,
    inStock: true
  },
  {
    title: "AKA CHIC Women's Regular Jeans",
    desc:
      "Being the leading name in the industry we are involved in offering a w...",
    img: "https://m.media-amazon.com/images/I/5147Msr1aXL._UL1080_.jpg",
    categories: ["men", "women"],
    size: ["M", "L", "XL"],
    color: ["black"],
    price: 3000,
    inStock: true
  },
  {
    title: "Urbano Fashion Men's Slim Fit Washed Jogger Jeans Stretchable",
    desc:
      "Trendy and appealing, this shirt from FUNDAY FASHION exclusive collect...",
    img: "https://m.media-amazon.com/images/I/5147Msr1aXL._UL1080_.jpg",
    categories: ["men", "women"],
    size: ["M", "L", "XL"],
    color: ["black"],
    price: 3000,
    inStock: true
  },
  {
    title: "Matelco Womens Woollen Collared Coat Cardigan",
    desc:
      "Trendy and appealing, this shirt from FUNDAY FASHION exclusive collect...",
    img: "https://m.media-amazon.com/images/I/5147Msr1aXL._UL1080_.jpg",
    categories: ["men", "women"],
    size: ["M", "L", "XL"],
    color: ["black"],
    price: 3000,
    inStock: true
  },
  {
    title: "Women Laped Long Wool Worsted High Collared Coat",
    desc:
      "Trendy and appealing, this shirt from FUNDAY FASHION exclusive collect...",
    img: "https://m.media-amazon.com/images/I/5147Msr1aXL._UL1080_.jpg",
    categories: ["men", "women"],
    size: ["M", "L", "XL"],
    color: ["black"],
    price: 3000,
    inStock: true
  }
]


describe("About Auth: ",()=>{
  beforeAll(async ()=>{
    await User.deleteMany({})
  })
  const user = {
    username:"testuser",
    password:"testpassword",
    email:"testuser@gmail.com",
    phonenumber:"+919898989898"
  }
  test("user can be registered with valid user info ",async ()=>{
    const response = await api.post("/api/auth/register").send(user).expect(201).expect('Content-Type',/application\/json/)
    // expect(response.body["savedUser"]).toBedefined()
  })
})

describe("About Products: ", () => {
  beforeAll(async () => {
    await Product.deleteMany({})
    await Product.insertMany(initialProducts)
    const user = {
      username: "testuser",
      password: "testpassword"
    }
    const response = await api.post("/api/auth/login").send(user).expect(200)
    AuthToken = response.body.token
    console.log(AuthToken)
  })
  test("products can be fetched and fetched products should be same as in db", async () => {
    const ProductsInDb = await Product.find({})
    console.log(typeof ProductsInDb)
    const ProductsInDbJson = ProductsInDb.map((blog) => blog.toJSON())
    console.log(typeof ProductsInDbJson)
    expect(ProductsInDbJson).toHaveLength(initialProducts.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
