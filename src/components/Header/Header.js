import './Header.css'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logOutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="main1">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="headerimg"
          />
        </Link>
      </div>
      <div>
        <ul className="header1">
          <Link to="/">
            <li className="list">Home </li>
          </Link>
          <Link to="/jobs">
            <li className="list">Jobs</li>
          </Link>
        </ul>
      </div>
      <div>
        <button type="button" onClick={logOutButton} className="button1">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
