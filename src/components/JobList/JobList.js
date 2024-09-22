import './JobList.css'
import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'

const JobList = props => {
  const {company} = props
  const {
    id,
    companyLogo,
    employeeType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = company
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li>
        <div className="companyset">
          <div className="set345">
            <div>
              <img src={companyLogo} alt="company logo" className="comImg" />
            </div>
            <div className="jobSet">
              <h1 className="jobtitle">{title}</h1>
              <div className="ratingset">
                <FaStar className="star" />
                <p className="jobRating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location">
            <div className="rate">
              <div className="ratingset1">
                <MdLocationOn className="image123" />
                <p className="loc">{location}</p>
              </div>
              <div className="ratingset1">
                <BsFillBagFill className="image123" />
                <p className="loc">{employeeType}</p>
              </div>
            </div>
            <p className="loc1">{packagePerAnnum}</p>
          </div>
          <hr className="hr23" />
          <div>
            <h1 className="jobDec">Description</h1>
            <p className="paraJob">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default JobList
