import "./District.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Divider from "../Divider/Divider";
import Pagination from "../Pagination/Pagination";
import { districts } from "../../data/district";

const District = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedDistricts = districts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="district-section">
      <div className="container">

        <div className="section-heading text-center">
          <span className="sub-title">Explore Kerala</span>
          <h2>Kerala Districts</h2>
        </div>
        <Divider/>

        <div className="row g-4">
          {selectedDistricts.map((district) => (
            <div key={district.id} className="col-12 col-md-6 col-lg-4">
              <Link to={`/district/${district.id}`} className="trip-link">

                <div className="featured-destination-card">

                  <img src={district.image} alt={district.name} />

                  <div className="overlay-content d-flex flex-wrap gap-4 align-items-end justify-content-between">
                    <div>
                      <h4 className="mb-0 text-white">{district.name.charAt(0).toUpperCase() + district.name.slice(1)}</h4>
                    </div>
                  </div>

                </div>

              </Link>

            </div>
          ))}
        </div>

        <Pagination totalItems={districts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}/>
      </div>
      <Divider />
    </section>
  );
};

export default District;