import './Breadcrumb.css'
import { Link } from "react-router-dom";


const Breadcrumb = ({ title, middlePage, currentPage }) => {
  return (
    <div className="breadcrumb-section" style={{ backgroundColor: "#3CB371" }}>
      <div className="container">

        {/* CONTENT */}
        <div className="breadcrumb-content">
          <div className="divider"></div>
          <h2>{ title }</h2>
          <ul className='list-unstyled'>
            <li>
              <Link to={'/'}>Home</Link>
              <span className="breadcrumb-separator">{' > '}</span>
            </li>

            {middlePage && (
              <li>
                <Link to={'/destination'}>{middlePage}</Link>
                <span className="breadcrumb-separator">{' > '}</span>
              </li>
            )}
            <li>{ currentPage }</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb