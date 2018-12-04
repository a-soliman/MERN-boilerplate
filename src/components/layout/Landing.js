import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/auth";
import GoogleButton from "../ui/GoogleButton";

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
    if (this.props.location.search.length > 0) {
      this.props.googleLogin(this.props.location.search);
    }
  };

  render() {
    return (
      <div className="landing full-height">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">MERN Boilerplate</h1>
                <p className="lead">
                  {" "}
                  Get Started in not time with Node, Express, React, Redux, and
                  mote...
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
                <div className="text-white rounded-circle border border-info my-5 or">
                  Or
                </div>
                <GoogleButton
                  link="/api/users/google"
                  text="Login with Google"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleLogin: token => dispatch(googleLogin(token))
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
