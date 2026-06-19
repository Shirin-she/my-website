import { useState } from "react"
import "./prdct.css"

const API_BASE_URL = "https://sample-e-1.onrender.com"

function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!name || !price || !description || !stock || !file || !category) {
      setMessage("Please fill in all fields before adding the product.")
      return
    }

    setMessage("Adding product...")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("description", description)
    formData.append("stock", stock)
    formData.append("image", file, file.name)

    try {
      const res = await fetch(`${API_BASE_URL}/product/addproduct`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const body = await res.text().catch(() => "")
        console.warn("Add product API returned error:", res.status, body)
        setMessage("Could not add product to server. Saved locally instead.")
        saveLocally()
        return
      }

      const data = await res.json().catch(() => ({}))
      const created = data.product || data

      try {
        const existing = JSON.parse(localStorage.getItem("localProducts") || "[]")
        existing.unshift(created)
        localStorage.setItem("localProducts", JSON.stringify(existing))
      } catch (err) {
        console.warn("Could not save server product locally:", err)
      }

      setMessage("Product added to server successfully!")
      setName("")
      setPrice("")
      setDescription("")
      setCategory("")
      setStock("")
      setFile(null)
      if (event.target && typeof event.target.reset === "function") event.target.reset()
    } catch (err) {
      console.error("API request failed, saving locally:", err)
      setMessage("Server request failed. Product saved locally.")
      saveLocally()
    }
  }

  // helper to save the product locally (reads file as data URL)
  function saveLocally() {
    const reader = new FileReader()
    reader.onload = () => {
      const imageData = reader.result

      const newProduct = {
        _id: `local-${Date.now()}`,
        name: name,
        price: parseFloat(price) || 0,
        description: description,
        stock: parseInt(stock || "0", 10) || 0,
        image: imageData,
        category: category || "Local",
      }

      try {
        const existing = JSON.parse(localStorage.getItem("localProducts") || "[]")
        existing.unshift(newProduct)
        localStorage.setItem("localProducts", JSON.stringify(existing))

        setMessage("Product saved locally (offline fallback).")
        setName("")
        setPrice("")
        setDescription("")
        setCategory("")
        setStock("")
        setFile(null)
      } catch (err) {
        console.error(err)
        setMessage("Failed to save product locally.")
      }
    }

    reader.onerror = () => {
      setMessage("Failed to read the image file for local save.")
    }

    reader.readAsDataURL(file)
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
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
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
