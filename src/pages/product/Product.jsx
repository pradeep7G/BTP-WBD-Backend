import { Link, useLocation } from "react-router-dom"
import "./product.css"

import { useSelector, useDispatch } from "react-redux"
import {  useState } from "react"
import { updateProduct } from "../../redux/apiCalls"
import Select from "react-select"


//admin product page, where admin can update the existing product

const Product = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const productId = location.pathname.split("/")[2]  //extracting productId
  const [product, setProduct] = useState(
    useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    )  
  ) //extracting specific produt with id `id` from redux store
  const [formData, setFormData] = useState({
    title: product.title,
    desc: product.desc,
    img: product.img,
    price: product.price,
    inStock: product.inStock
  }) //initializing formData state
  const user = useSelector((state) => state.user) //extracting user from state
  //available size optons
  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" }
  ]
  //available color optons
  const colorOptions = [
    { value: "White", label: "White" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "Red", label: "Red" },
    { value: "Black", label: "Black" },
    { value: "Brown", label: "Brown" },
    { value: "Violet", label: "Violet" },
    { value: "Orange", label: "Orange" },
    { value: "Grey", label: "Grey" }
  ]
  //available category optons
  const categoryOptions = [
    { value: "jeans", label: "jeans" },
    { value: "women", label: "women" },
    { value: "men", label: "men" },
    { value: "shirts", label: "shirts" },
    { value: "full sleeve", label: "full sleeve" },
    { value: "coat", label: "coat" },
    { value: "stylish", label: "stylish" },
    { value: "suit", label: "suit" },
    { value: "pants", label: "pants" },
    { value: "regular jeans", label: "regular jeans" },
    { value: "slim fit", label: "slim fit" },
    { value: "loose", label: "loose" },
    { value: "fit", label: "fit" },
    { value: "relaxed", label: "relaxed" }
  ]
  //handle selected size options
  const [selectedSizeOptions, setSelectedSizeOptions] = useState(
    product.size.map((size) => {
      return { value: size, label: size }
    })
    )
    //handle selected color options
    const [selectedColorOptions, setSelectedColorOptions] = useState(
      product.color.map((color) => {
        return { value: color, label: color }
      })
      )
      //handle selected category options
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState(
    product.categories.map((category) => {
      return { value: category, label: category }
    })
  )
  //handle multi-select user input of size
  const handleSizeChange = (selectedSizeOption) => {
    setSelectedSizeOptions(selectedSizeOption)
  }
  //handle multi-select user input of color
  const handleColorChange = (selectedColorOption) => {
    setSelectedColorOptions(selectedColorOption)
  }
  //handle multi-select user input of category
  const handleCategoryChange = (selectedCategoryOption) => {
    setSelectedCategoryOptions(selectedCategoryOption)
  }

  //handleInput of formData and product
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = product._id
    try {
      updateProduct(id, { ...formData, _id: id }, dispatch, user)
    } catch (err) {
      console.log(err)
    }
  }

  //handle form data
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      size: selectedSizeOptions.map((option) => option["value"]),
      categories: selectedCategoryOptions.map((option) => option["value"]),
      color: selectedColorOptions.map((option) => option["value"])
    })
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "yes" : "no"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* render product form with initia product info and edit it to update the product */}
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={product.title}
              name="title"
              onChange={handleInput}
              placeholder={product.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              value={product.desc}
              name="desc"
              onChange={handleInput}
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              type="text"
              value={product.price}
              name="price"
              onChange={handleInput}
              placeholder={product.price}
            />
            <label>Image Link</label>
            <input
              type="text"
              value={product.img}
              name="img"
              onChange={handleInput}
              placeholder={product.img}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              value={product.inStock}
              onChange={handleInput}
              id="idStock"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Available Sizes</label>
            <Select
              value={selectedSizeOptions}
              onChange={handleSizeChange}
              options={sizeOptions}
              isMulti={true}
              name="size"
              key="size"
              id="size" 
            />
            <label>Available Colors</label>
            <Select
              value={selectedColorOptions}
              onChange={handleColorChange}
              options={colorOptions}
              isMulti={true}
              name="color"
              key="color"
              id="color"
            />
            <label>Available categories</label>
            <Select
              value={selectedCategoryOptions}
              onChange={handleCategoryChange}
              options={categoryOptions}
              isMulti={true}
              name="categories"
              key="categories"
              id="categories"
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
            </div>
            {/* submit the form */}
            <button
              className="productButton"
              type="submit"
              onClick={handleFormData}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Product
