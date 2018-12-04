import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/auth";
import Form from "../ui/Form";
import GoogleButton from "../ui/GoogleButton";

class Login extends Component {
  state = {
    loading: false,
    formData: {
      email: {
        name: "email",
        value: "",
        type: "email",
        placeholder: "Email Address",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        name: "password",
        value: "",
        type: "password",
        placeholder: "Password",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    },
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.attachErrorsToState({ ...nextProps.errors });
    }
  };

  attachErrorsToState = errors => {
    const formData = { ...this.state.formData };
    const otherErrors = { ...this.state.errors };

    for (const field in formData) {
      if (errors[field]) {
        formData[field].valid = false;
        formData[field].validationMessage = errors[field];
      } else {
        formData[field].valid = true;
        formData[field].validationMessage = "";
      }
      delete errors[field];
    }
    for (const field in errors) {
      otherErrors[field] = errors[field];
    }

    this.setState({ formData, errors: otherErrors });
  };

  onFormUpdate = event => {
    const newFormData = { ...this.state.formData };
    const element = event.target.name;
    const value = event.target.value;
    newFormData[element].value = value;

    this.setState({
      formData: newFormData
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const userData = {};
    for (const field in this.state.formData) {
      userData[field] = this.state.formData[field].value;
    }

    this.props.login(userData);
  };
  render() {
    const { email, password } = this.state.formData;
    return (
      <div className="login full-height">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <Form
                fields={[email, password]}
                onChangleHandler={this.onFormUpdate}
                onSubmitHandler={this.onFormSubmit}
              />

              <div className="text-info rounded-circle border border-info my-5 or">
                Or
              </div>
              <GoogleButton link="/api/users/google" text="Login with Google" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(login(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
