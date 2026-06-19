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
            // always load any locally stored products first
            let localProducts = []
            try {
                localProducts = JSON.parse(localStorage.getItem('localProducts') || '[]')
            } catch (err) {
                localProducts = []
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/product/getproducts`
                )

                const data = await response.json()

                if (!response.ok) {
                    // server returned error, still show local products
                    setProducts(localProducts)
                    throw new Error(data.message || "Failed to fetch products")
                }

                const normalizedProducts = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.value)
                    ? data.value
                    : []

                // merge local items first so they appear at the top
                setProducts([...localProducts, ...normalizedProducts])
            } catch (err) {
                // on network/server error, show any local products instead of failing silently
                setError(err.message || "Something went wrong")
                if (localProducts.length > 0) setProducts(localProducts)
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

    if (error && products.length === 0) {
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
                    ? product.image.startsWith("http") || product.image.startsWith("data:")
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

                        <button type="button">Add To Cart</button>
                    </article>
                )
            })}
        </div>
    )
}

export default Card
