import { useState } from "react"
import "./newProduct.css"
import { addProduct } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Select from "react-select"
import axios from "axios"

const NewProduct = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  //product
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: [],
    size: [],
    color: [],
    price: "",
    inStock: true
  })

  const [fileData, setFileData] = useState()

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0])
  }

  const handleSubmitimage = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("image", fileData)

    axios
      .post("http://localhost:5000/uploadFile", data)
      .then((result) => {
        console.log("successfull: ", result)
        setProduct({
          ...product,
          img: `http://localhost:5000/uploads/${result.data.filename}`
        })
      })
      .catch((err) => console.log(err))
  }
  //handling selected options of multi select input of size
  const [selectedSizeOptions, setSelectedSizeOptions] = useState([])
  //handling selected options of multi select input of color
  const [selectedColorOptions, setSelectedColorOptions] = useState([])
  //handling selected options of multi select input of category
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([])

  //available size options
  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" }
  ]
  //available color options
  const colorOptions = [
    { value: "White", label: "White" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "Red", label: "Red" },
    { value: "Black", label: "Black" },
    { value: "Brown", label: "Brown" },
    { value: "Blue", label: "Blue" },
    { value: "Violet", label: "Violet" },
    { value: "Orange", label: "Orange" },
    { value: "Grey", label: "Grey" }
  ]
  //available category options
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

  //handle user input

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  //handle multi select input of size input
  const handleSizeChange = (selectedSizeOption) => {
    setSelectedSizeOptions(selectedSizeOption)
  }
  //handle multi select input of colors input
  const handleColorChange = (selectedColorOption) => {
    setSelectedColorOptions(selectedColorOption)
  }
  //handle multi select input of categories input
  const handleCategoryChange = (selectedCategoryOption) => {
    setSelectedCategoryOptions(selectedCategoryOption)
  }

  //handle submit

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      addProduct(dispatch, user, product) //calling addproduct api call to add product
      history.push("/products")
    } catch (err) {
      console.log(err)
    }
  }

  //handle click
  const handleClick = (e) => {
    setProduct({
      ...product,
      size: selectedSizeOptions.map((option) => option["value"]),
      categories: selectedCategoryOptions.map((option) => option["value"]),
      color: selectedColorOptions.map((option) => option["value"])
    }) //set the state of updated product
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>

      {/* form consisting of different inputs like title , desc, categories etc... */}

      <div className="addProductItem">
        <label>Upload Image</label>
        <input type="file" onChange={fileChangeHandler} />
        <br />
        <br />
        <button onClick={handleSubmitimage}>submit</button>
      </div>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image Link</label>
          <input
            type="text"
            name="img"
            value={product.img}
            id="img"
            onChange={handleInput}
            disabled
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={product.title}
            placeholder="Apple Airpods"
            onChange={handleInput}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={product.desc}
            placeholder="description..."
            onChange={handleInput}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            value={product.price}
            onChange={handleInput}
          />
        </div>
        <div className="addProductItem">
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
        <div className="addProductItem">
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
        </div>
        <div className="addProductItem">
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
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" value onChange={handleInput}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* create new product */}
        <div className="productFormRight">
          <div className="productUpload">
            <img src={product.img} alt="product img" className="productUploadImg" />
          </div>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  )
}

export default NewProduct
