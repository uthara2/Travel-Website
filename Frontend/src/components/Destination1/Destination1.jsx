import './Destination1.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../Card/Card'   // ✅ import your reusable card
import shape2 from '../../assets/shape2.png'

const Destination1 = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => {
        setCategories(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <section className="featured-destination">
      <div className="shape">
        <img src={shape2} alt="" />
      </div>

      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section-heading text-center">
              <span className="sub-title">Explore Categories</span>
              <h2 className="mb-0">Featured Destinations</h2>
            </div>
          </div>
        </div>

        <div className="divider-sm"></div>

        {/* ✅ CLEAN GRID */}
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat._id} className="col-12 col-sm-6 col-lg-4">
              
              <Card
                image={cat.image}
                title={cat.name}
                link={`/category/${cat._id}`}
              />

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destination1