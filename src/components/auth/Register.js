import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { register } from "../../actions/auth";
import GoogleButton from "../ui/GoogleButton";
import Form from "../ui/Form";

class Register extends Component {
  state = {
    name: "",
    loading: false,
    formData: {
      name: {
        name: "name",
        value: "",
        type: "text",
        placeholder: "Name",
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      },
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
      },
      passwordConfirmation: {
        name: "passwordConfirmation",
        value: "",
        type: "password",
        placeholder: "Confirm Password",
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
    if (nextProps.errors) {
      this.attachErrorsToState({ ...nextProps.errors });
    }
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

  onFormSubmit = event => {
    event.preventDefault();

    /* VALIDATE DATA */

    const newUserData = {};
    for (const field in this.state.formData) {
      newUserData[field] = this.state.formData[field].value;
    }

    this.props.register(newUserData);
  };

  render() {
    const { name, email, password, passwordConfirmation } = this.state.formData;

    return (
      <div className="register full-height">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <Form
                fields={[name, email, password, passwordConfirmation]}
                onChangleHandler={this.onFormUpdate}
                onSubmitHandler={this.onFormSubmit}
              />
              <div className="text-info rounded-circle border border-info my-5 or">
                Or
              </div>
              <GoogleButton
                link="/api/users/google"
                text="Sign up with Google"
              />
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
  register: userData => dispatch(register(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
