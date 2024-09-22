import './Login.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', error: ''}

  onDataFailure = err => {
    this.setState({
      error: err,
    })
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitButton = async event => {
    const {username, password} = this.state
    const userDetails = {username, password}
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.onDataFailure(data.error_msg)
    }
  }

  usernameVal = event => {
    this.setState({
      username: event.target.value,
    })
  }

  passwordVal = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main">
        <div className="box">
          <div className="set">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="image"
            />
          </div>
          <div>
            <form className="form" onSubmit={this.submitButton}>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                id="username"
                placeholder="Username"
                onChange={this.usernameVal}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="text"
                className="input"
                id="password"
                placeholder="Password"
                onChange={this.passwordVal}
              />
              <button type="submit" className="button">
                Login
              </button>
            </form>
            <p className="error">{error}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
