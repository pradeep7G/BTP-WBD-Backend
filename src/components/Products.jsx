import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

//products page, which has products access of specific category

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  //useEffect to get products from the databse
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
          )
          setProducts(res.data)
        } catch (err) {}
      }
      getProducts()
    }, [cat])
    
    //useEffect to filter the products by color and size
    useEffect(() => {
      cat &&
      setFilteredProducts(
        products.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          if (value === "Color") return true
          if (value === "Size") return true
          return item[key].includes(value)
        })
        )
        )
      }, [products, cat, filters])
      
      //useEffect to sort the products by newest
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
    {/* rendering filtered products and sorted products */}
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  )
}

export default Products
