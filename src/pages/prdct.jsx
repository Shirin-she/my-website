import { useState } from "react"
import "./prdct.css"

function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name || !price || !description || !stock || !file) {
      setMessage("Please fill in all fields before adding the product.")
      return
    }

    setMessage("Product added successfully!")
    setName("")
    setPrice("")
    setDescription("")
    setStock("")
    setFile(null)
  }

  return (
    <div className="add-product-page">
      <div className="add-product-box">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit} className="add-product-form">
          <label>
            Product Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows="4"
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              inputMode="numeric"
              pattern="\d*"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity"
              min="0"
              step="1"
            />
          </label>

          <label>
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button type="submit">Add Product</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  )
}

export default AddProduct
