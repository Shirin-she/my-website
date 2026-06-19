import { useEffect, useState } from "react"
import { InfinitySpin } from "react-loader-spinner"
import "./card.css"

const API_BASE_URL = "https://sample-e-1.onrender.com"

function Card() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/product/getproducts`
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    )
                }

                const normalizedProducts = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.value)
                    ? data.value
                    : []

                setProducts(normalizedProducts)
            } catch (err) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="card-loading-container">
                <InfinitySpin width="200" color="#4fa94d" />
            </div>
        )
    }

    if (error) {
        return <p className="error-text">{error}</p>
    }

    if (products.length === 0) {
        return (
            <p className="error-text">
                No products available right now.
            </p>
        )
    }

    return (
        <div className="products-grid">
            {products.map((product) => {
                const imageUrl = product.image
                    ? product.image.startsWith("http")
                        ? product.image
                        : `${API_BASE_URL}/${product.image}`
                    : "https://via.placeholder.com/300"

                return (
                    <article key={product._id} className="product-card">
                        <img
                            src={imageUrl}
                            alt={product.name || "Product"}
                            className="product-image"
                        />

                        <p className="product-tag">
                            {product.category || "General"}
                        </p>

                        <h2 className="product-name">
                            {product.name || "Unnamed Product"}
                        </h2>

                        <p className="product-price">
                            ₹{product.price || 0}
                        </p>

                        <p className="product-description">
                            {product.description ||
                                "No description available."}
                        </p>

                        <button type="button">Choose Plan</button>
                    </article>
                )
            })}
        </div>
    )
}

export default Card
