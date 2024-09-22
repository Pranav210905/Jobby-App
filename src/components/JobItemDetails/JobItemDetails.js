import './JobItemDetails.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header/Header'

const constStates = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJob: [],
    skillsofJobs: [],
    jobLifeCompany: [],
    jobInfo: '',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      jobInfo: constStates.loading,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url2 = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = await Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response2 = await fetch(url2, options)
    if (response2.ok) {
      const dataValue = await response2.json()
      const upJobFormat = {
        companylogoUrl: dataValue.job_details.company_logo_url,
        companyWebsiteUrl: dataValue.job_details.company_website_url,
        employmentType: dataValue.job_details.employment_type,
        jobDescription: dataValue.job_details.job_description,
        id: dataValue.job_details.id,
        lifeAtCompany: dataValue.job_details.life_at_company,
        location: dataValue.job_details.location,
        packagePerAnnum: dataValue.job_details.package_per_annum,
        rating: dataValue.job_details.rating,
        skills: dataValue.job_details.skills,
        title: dataValue.job_details.title,
      }

      const uPskill = dataValue.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))

      const upJob = {
        description: dataValue.job_details.life_at_company.description,
        imageUrl: dataValue.job_details.life_at_company.image_url,
      }

      this.setState({
        jobLifeCompany: upJob,
      })

      this.setState({
        skillsofJobs: uPskill,
      })

      const upsimilarJobs = dataValue.similar_jobs.map(eachItem => ({
        companylogoUrl1: eachItem.company_logo_url,
        employmentType1: eachItem.employment_type,
        id: eachItem.id,
        rating: eachItem.rating,
        location: eachItem.location,
        jobDescription1: eachItem.job_description,
        title: eachItem.title,
      }))

      this.setState(
        {
          jobDetails: upJobFormat,
        },
        this.getJobItemDetails,
      )
      this.setState({
        similarJob: upsimilarJobs,
      })

      this.setState({
        jobInfo: constStates.success,
      })
    } else {
      this.setState({
        jobInfo: constStates.failure,
      })
    }
  }

  renderDataFailure = () => (
    <div className="failureSet">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failHead">Oops! Something Went Wrong</h1>
      <p className="failPara">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="button1"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessData = () => {
    const {similarJob, jobDetails, skillsofJobs, jobLifeCompany} = this.state
    return (
      <div className="jobBox">
        <ul>
          <li>
            <div className="companyset1">
              <div className="set345">
                <div>
                  <img
                    src={jobDetails.companylogoUrl}
                    alt="job details company logo"
                    className="comImg"
                  />
                </div>
                <div className="jobSet">
                  <h1 className="jobtitle">{jobDetails.title}</h1>
                  <div className="ratingset">
                    <FaStar className="star" />
                    <p className="jobRating">{jobDetails.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location">
                <div className="rate">
                  <div className="ratingset1">
                    <MdLocationOn className="image123" />
                    <p className="loc">{jobDetails.location}</p>
                  </div>
                  <div className="ratingset1">
                    <BsFillBagFill className="image123" />
                    <p className="loc">{jobDetails.employmentType}</p>
                  </div>
                </div>
                <p className="loc1">{jobDetails.packagePerAnnum}</p>
              </div>
              <hr />
              <div>
                <div className="dech">
                  <h1 className="jobDec">Description</h1>
                  <a href={jobDetails.companyWebsiteUrl}>Visit</a>
                </div>
                <p className="paraJob">{jobDetails.jobDescription}</p>
              </div>
              <div>
                <h1 className="jobDec">Skills</h1>
                <ul>
                  <div className="skillsBox">
                    {skillsofJobs.map(eachItem => (
                      <li key={eachItem.name}>
                        <div className="skillset">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.anme}
                            className="skillImg"
                          />
                          <p className="loc1">{eachItem.name}</p>
                        </div>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
              <div>
                <h1 className="jobDec">Life at Company</h1>
                <div className="companyBox">
                  <div>
                    <p className="loc3">{jobLifeCompany.description}</p>
                  </div>
                  <div>
                    <img
                      src={jobLifeCompany.imageUrl}
                      alt="life at company"
                      className="companyImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="SimilarMain">
          <h1 className="jobDec">Similar Jobs</h1>
          <ul>
            <div className="SimilarSet">
              {similarJob.map(eachItem => (
                <li key={eachItem.id}>
                  <div className="SimilarBox">
                    <div className="set345">
                      <div>
                        <img
                          src={eachItem.companylogoUrl1}
                          alt="similar job company logo"
                          className="comImg1"
                        />
                      </div>
                      <div className="jobSet">
                        <h1 className="jobtitle1">{eachItem.title}</h1>
                        <div className="ratingset">
                          <FaStar className="star" />
                          <p className="jobRating1">{eachItem.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="jobDec">Description</h1>
                      <p className="paraJob">{eachItem.jobDescription1}</p>
                    </div>
                    <div className="location">
                      <div className="rate">
                        <div className="ratingset1">
                          <MdLocationOn className="image123" />
                          <p className="loc">{eachItem.location}</p>
                        </div>
                        <div className="ratingset1">
                          <BsFillBagFill className="image123" />
                          <p className="loc">{eachItem.employmentType1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {jobInfo} = this.state
    let dat
    switch (jobInfo) {
      case constStates.success:
        dat = this.renderSuccessData()
        break
      case constStates.failure:
        dat = this.renderDataFailure()
        break
      case constStates.loading:
        dat = this.renderLoadingView()
        break
      default:
        dat = null
        break
    }
    return (
      <>
        <Header />
        <div className="jobMain">{dat}</div>
      </>
    )
  }
}

export default JobItemDetails
