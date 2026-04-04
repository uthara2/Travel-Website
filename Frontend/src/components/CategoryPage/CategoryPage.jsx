import './CategoryPage.css'
import Breadcrumb from '../common/Breadcrumb/Breadcrumb'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const CategoryPage = () => {
    const { categoryId } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({ category: null, destinations: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.get(`https://travel-website-lm4n.onrender.com/api/destinations/category/${categoryId}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setError("Failed to load destinations.")
                setLoading(false)
            })
    }, [categoryId])

    return (
        <div className="category-page">
            

            <Breadcrumb
                title={data.category?.name || "Category"}
                middlePage="Destination"
                currentPage={data.category?.name || "Category"}
            />

            <section className="category-content">
                <div className="container">

                    {/* Loading */}
                    {loading && (
                        <div className="category-loader">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton-card">
                                    <div className="skeleton-img shimmer"></div>
                                    <div className="skeleton-body">
                                        <div className="skeleton-line shimmer"></div>
                                        <div className="skeleton-line short shimmer"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <div className="category-error">
                            <span>⚠️</span>
                            <p>{error}</p>
                            <button onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && data.destinations.length === 0 && (
                        <div className="category-empty">
                            <div className="empty-icon">🗺️</div>
                            <h3>No Destinations Yet</h3>
                            <p>We're working on adding places in this category. Check back soon!</p>
                        </div>
                    )}

                    {/* Cards */}
                    {!loading && !error && data.destinations.length > 0 && (
                        <section className="featured-destination">
                            <div className="container">
                                <div className="row g-4">
                                    {data.destinations.map((dest) => (
                                        <div key={dest._id} className="col-12 col-sm-6 col-lg-4">

                                            <Link
                                                to={`/destination/${dest._id}`}
                                                className="dest-link"
                                            >
                                                <div className="featured-destination-card">
                                                    <img src={dest.image} alt={dest.place} />

                                                    <div className="overlay-content d-flex flex-wrap gap-4 align-items-end justify-content-between">
                                                        <div>
                                                            <h4 className="mb-0 text-white">
                                                                {dest.place}
                                                            </h4>
                                                            <p className="mb-0">{dest.district}</p>
                                                        </div>

                                        
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                </div>
            </section>
        </div>
    )
}

export default CategoryPage