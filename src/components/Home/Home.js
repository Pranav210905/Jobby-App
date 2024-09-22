import './Home.css'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header/Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="main2">
      <Header />
      <div className="set23">
        <div className="set12">
          <h1 className="Homehead">Find The Job That Fits Your Life</h1>
          <p className="Homepara">
            Millions of people are searching for jobs,salary information,company
            reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="button2">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
