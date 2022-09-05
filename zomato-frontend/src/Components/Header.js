import React, { Component } from 'react';
import '../Styles/Header.css';
import axios from 'axios';
import { API_URL } from './constants';
import Modal from 'react-modal';

Modal.setAppElement('#root');


class Header extends Component {

  constructor() {
    super();
    this.state = {
      HederStyle: '',
      isLoginModalOpen: false,
      isSignupModalOpen: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      user: undefined,
      isLoggedIn: false,
      loginError: undefined,
      signupError: undefined
    };
  }

  componentDidMount() {
    let IntialPath = window.location.pathname;
    setInterval(() => {
      IntialPath = window.location.pathname;

      this.HeaderStyle(IntialPath);
    }, 0);

    console.log('it is the intial pathname', IntialPath);
  }

  HeaderStyle = (IntialPath) => {
    let bg;
    if (IntialPath == '/' || IntialPath == '/Home') {
      bg = 'transparent';
    } else {
      bg = 'coloured';
    }
    this.setState({
      HeaderStyle: bg,
    });
  };

  openLoginModal = () => {
    this.setState({
      isLoginModalOpen: true
    })
  }

  closeLoginModal = () => {
    this.setState({
      isLoginModalOpen: false
    })
  }

  loginHandler = () => {
    const { username, password } = this.state;
    const req = {
      email: username,
      password: password,
    }
    axios({
      method: 'POST',
      url: `${API_URL}/UserLogin`,
      headers: { 'Content-Type': 'application/json' },
      data: req
    }).then(result => {
      const user = result.data.userData;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      this.setState({
        user: user,
        isLoggedIn: true,
        loginError: undefined,
        isLoginModalOpen: false
      })
    }).catch(err => {
      this.setState({
        isLoggedIn: false,
        loginError: "Username or password is wrong"
      })
    })
  }

  cancelLoginHandler = () => {
    this.closeLoginModal();
  }

  openSignupModal = () => {
    this.setState({
      isSignupModalOpen: true
    })
  }

  closeSignupModal = () => {
    this.setState({
      isSignupModalOpen: false
    })
  }

  signupHandler = () => {
    const { 
      username, 
      password, 
      firstName, 
      lastName 
    } = this.state;

    const req = {
      email: username,
      password: password,
      FirstName: firstName,
      LastName: lastName
    }
    axios({
      method: 'POST',
      url: `${API_URL}/UserSignUp`,
      headers: { 'Content-Type': 'application/json' },
      data: req
    }).then(result => {
      const user = result.data.user;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      this.setState({
        user: user,
        isLoggedIn: true,
        signupError: undefined,
        isSignupModalOpen: false
      })
    }).catch(err => {
      this.setState({
        isLoggedIn: false,
        signupError: "Error Signing up"
      })
    })
  }

  cancelSignupHandler = () => {
    this.closeSignupModal();
  }

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    this.setState({
      user: undefined,
      isLoggedIn: false
    })
  }

  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
      [field]: val,
      loginError: undefined,
      signupError: undefined
    })
  }


  render() {
    const { 
      HeaderStyle, 
      isLoginModalOpen, 
      isSignupModalOpen, 
      username, 
      password, 
      firstName, 
      lastName, 
      loginError, 
      signupError, 
      isLoggedIn, 
      user 
    } = this.state;

    return (
      <React.Fragment>
        <div
          className='header'
        >
          <div className='container'>
            <div className='row'>
              <div className='col-6'>
                {HeaderStyle == 'coloured' ? (
                  <div className='logo1'>e!</div>
                ) : null}
              </div>
              <div className='col-6'>
                {
                  isLoggedIn && (user !== undefined) ?
                    <div className="logout">
                      <span className="text-white m-4">{user[0].FirstName}</span>
                      <button className="logoutbutton" onClick={this.logout}>Logout</button>
                    </div>
                    :
                    <div className='loginpart'>
                      <buton
                        className='btn-transperant btn-Login'
                        onClick={this.openLoginModal}
                      >
                        Login
                      </buton>
                      <buton
                        className='btn-transperant btn-Createaccount'
                        onClick={this.openSignupModal}
                      >
                        Create an account
                      </buton>
                    </div>
                }

              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isLoginModalOpen} className="loginPage">
          <h2>
            Login
            <button className="btn btn-outline-danger float-end" onClick={this.closeLoginModal}>X</button>
          </h2>
          <form className="form">
            {loginError ? <div className="alert alert-danger text-center my-3">{loginError}</div> : null}
            <input type="text" className="form-control username" placeholder="Email" required value={username} onChange={(e) => this.handleChange(e, 'username')} />
            <input type="password" className="form-control password" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')} />
            <div className="text-center">
              <button className="loginBtn" onClick={this.loginHandler}>Login</button>
              <button className="cencelBtn" onClick={this.cancelLoginHandler}>Cancel</button>
            </div>
            <div className="mt-4">

            </div>
          </form>
        </Modal>
        <Modal isOpen={isSignupModalOpen} className="loginPage">
          <h2>
            Signup
            <button className="btn btn-outline-danger float-end" onClick={this.closeSignupModal}>X</button>
          </h2>
          <form className="form">
            {signupError ? <div className="alert alert-danger text-center my-3">{signupError}</div> : null}
            <input type="text" className="form-control username" placeholder="Email" required value={username} onChange={(e) => this.handleChange(e, 'username')} />
            <input type="password" className="form-control password" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')} />
            <input type="text" className="form-control username" placeholder="First Name" required value={firstName} onChange={(e) => this.handleChange(e, 'firstName')} />
            <input type="text" className="form-control username" placeholder="Last Name" required value={lastName} onChange={(e) => this.handleChange(e, 'lastName')} />
            <div className="text-center">
              <button className="loginBtn" onClick={this.signupHandler}>SignUp</button>
              <button className="cencelBtn" onClick={this.cancelSignupHandler}>Cancel</button>
            </div>
            <div className="mt-4">

            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
