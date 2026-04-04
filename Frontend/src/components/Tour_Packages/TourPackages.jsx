import './TourPackages.css'
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

import shape2 from '../../assets/shape2.png'

const TourPackages = () => {

  const [packages, setPackages] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentPackages = packages.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    axios.get("https://travel-website-lm4n.onrender.com/api/packages")
      .then(res => {
        setPackages(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <section className="tour-packages">

      <div className="shape">
        <img src={shape2} alt="" />
      </div>

      <div className="divider"></div>

      <div className="container">

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">

            <div className="section-heading text-center">
              <span className="sub-title">Explore Packages</span>
              <h2 className="mb-0">Popular Tour Packages</h2>
            </div>

          </div>
        </div>

        <div className="divider-sm"></div>

        <div className="row g-4">

          {currentPackages.map((pkg) => (

            <div key={pkg._id} className="col-12 col-sm-6 col-lg-4">

              <Link
                to={`/tour-package/${pkg._id}`}
                style={{ textDecoration: "none" }}
              >

                <div className="tour-package-card">

                  <img src={pkg.image} alt={pkg.title} />

                  <div className="card-content">

                    <h4>{pkg.title}</h4>

                    <p className="destination">
                      {pkg.destination}
                    </p>

                    <p className="duration">
                      {pkg.duration}
                    </p>

                    <div className="price">
                      ₹{pkg.price}
                    </div>

                  </div>

                </div>

              </Link>

            </div>

          ))}

          <Pagination
              totalItems={packages.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />

        </div>

      </div>

      <div className="divider"></div>

    </section>
  )
}

export default TourPackages