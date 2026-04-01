import './Destination.css'
import shape2 from '../../assets/shape2.png'

import des1 from '../../assets/des1.jpg'
import des2 from '../../assets/des2.jpg'
import des3 from '../../assets/des3.jpg'

const Destination = () => {
  return (
    <section className="featured-destination">
      
      <div className="shape">
        <img src={shape2} alt="" />
      </div>

      <div className="divider"></div>

        <div className="container"> 
            <div className='row g-4 g-lg-5 align-items-end'>
                <div className="col-12 col-sm-6">
                    <div className="section-heading">
                        <span className="sub-title">Popular Destination</span>
                        <h2>Featured Destination</h2>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-4 offset-lg-2">
                    <div className="section-heading">
                        <p>
                        At Express Travel, we believe in the transformative power of
                        travel. As avid explorers ourselves, we understand the desire
                        to uncover.
                        </p>
                    </div>
                </div>
            </div>

            <div className="divider-sm"></div>

            <div className="row g-4 featured-destination-cards">
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="featured-destination-card animate__animated animate__fadeInUp delay-02">
                        <img src={des1} alt="" />

                        <div className="overlay-content d-flex flex-wrap gap-4 align-items-end justify-content-between">
                            <div>
                                <p className="mb-1 text-white">Travel To</p>
                                <h4 className="mb-0 text-white">Manhattan</h4>
                            </div>
                    
                            <span className="badge"><span className="counter is-visible" style={{visibility:"visible"}}>30</span> Tours</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="featured-destination-card animate__animated animate__fadeInUp delay-04" >
                        <img src={des2} alt="" />

                        <div className="overlay-content d-flex flex-wrap gap-4 align-items-end justify-content-between">
                            <div>
                                <p className="mb-1 text-white">Travel To</p>
                                <h4 className="mb-0 text-white">Pearland</h4>
                            </div>
                            
                            <span className="badge"><span className="counter is-visible">40</span> Tours</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="featured-destination-card animate__animated animate__fadeInUp delay-06">
                        <img src={des3} alt="" />

                        <div className="overlay-content d-flex flex-wrap gap-4 align-items-end justify-content-between">
                            <div>
                                <p className="mb-1 text-white">Travel To</p>
                                <h4 className="mb-0 text-white">New York</h4>
                            </div>
                            
                            <span className="badge"><span className="counter is-visible">25</span> Tours</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div className="divider"></div>
    </section>
  )
}

export default Destination