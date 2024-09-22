import './Jobs.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {IoMdSearch} from 'react-icons/io'

import Cookies from 'js-cookie'

import Header from '../Header/Header'

import JobItem from '../JobItem/JobItem'

import JobItem1 from '../JobItem1/JobItem1'

import JobsList from '../JobList/JobList'

const constStates = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobUser: [],
    jobsValue: [],
    emp: '',
    sal: '',
    searchInputaVal: '',
    jobsState: '',
    profileState: '',
  }

  componentDidMount() {
    this.getJobDetails()
    this.getJobs()
  }

  checkFunction = id => {
    this.setState(
      {
        emp: id,
      },
      this.getJobs,
    )
  }

  radioFunction = id1 => {
    this.setState(
      {
        sal: id1,
      },
      this.getJobs,
    )
  }

  searchInput = event => {
    this.setState(
      {
        searchInputaVal: event.target.value,
      },
      this.getJobs,
    )
  }

  getJobDetails = async () => {
    this.setState({
      profileState: constStates.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobData = await response.json()
      const jobUpdate = {
        name: jobData.profile_details.name,
        profileUrl: jobData.profile_details.profile_image_url,
        bio: jobData.profile_details.short_bio,
      }
      this.setState({
        jobUser: jobUpdate,
        profileState: constStates.success,
      })
    } else {
      this.setState({
        profileState: constStates.failure,
      })
    }
  }

  getJobs = async () => {
    const {emp, sal, searchInputaVal} = this.state
    this.setState({
      jobsState: constStates.loading,
    })
    const url1 = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${sal}&search=${searchInputaVal}`
    const jwtToken = Cookies.get('jwt_token')
    const options1 = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(url1, options1)
    if (response1.ok) {
      const jobsVal = await response1.json()
      const updateJobs = jobsVal.jobs.map(eachItem => ({
        companyLogo: eachItem.company_logo_url,
        employeeType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsValue: updateJobs,
        jobsState: constStates.success,
      })
    } else {
      this.setState({
        jobsState: constStates.failure,
      })
    }
  }

  profileSuccess = () => {
    const {jobUser} = this.state
    return (
      <div className="set5">
        <img src={jobUser.profileUrl} alt="profile" className="jobUserImg" />
        <h1 className="jobHead">{jobUser.name}</h1>
        <p className="jobPara">{jobUser.bio}</p>
      </div>
    )
  }

  profileLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileFailure = () => (
    <button type="button" className="button1" onClick={this.getJobs}>
      Retry
    </button>
  )

  renderSuccess = () => {
    const {jobsValue} = this.state
    return (
      <div>
        <ul>
          {jobsValue.map(eachItem => (
            <JobsList company={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failureSet">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failHead">Oops! Something Went Wrong</h1>
      <p className="failPara">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button1" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  render() {
    const {searchInputaVal, jobsState, profileState} = this.state
    let profi
    switch (profileState) {
      case constStates.success:
        profi = this.profileSuccess()
        break
      case constStates.failure:
        profi = this.profileFailure()
        break
      case constStates.loading:
        profi = this.renderLoadingView()
        break
      default:
        profi = null
        break
    }
    let jo
    switch (jobsState) {
      case constStates.success:
        jo = this.renderSuccess()
        break
      case constStates.failure:
        jo = this.renderFailure()
        break
      case constStates.loading:
        jo = this.renderLoadingView()
        break
      default:
        jo = null
        break
    }
    return (
      <div className="main4">
        <Header />
        <div className="main5">
          <div className="box5">
            <div className="set5">{profi}</div>
            <hr className="hr" />
            <div>
              <ul>
                <p className="jobPara1">Types of Employment</p>
                {employmentTypesList.map(eachItem => (
                  <JobItem
                    jobItem={eachItem}
                    key={eachItem.employmentTypeId}
                    checkFunction={this.checkFunction}
                  />
                ))}
              </ul>
            </div>
            <hr className="hr" />
            <div>
              <ul>
                <p className="jobPara1">Salary Range</p>
                {salaryRangesList.map(eachItem => (
                  <JobItem1
                    salaryItem={eachItem}
                    key={eachItem.salaryRangeId}
                    radioFunction={this.radioFunction}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="set6">
              <input
                type="search"
                className="input12"
                placeholder="Search"
                onChange={this.searchInput}
                value={searchInputaVal}
              />
              <button
                type="button"
                className="searchbutton"
                data-testid="searchButton"
              >
                <IoMdSearch />
              </button>
            </div>
            {jo}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
