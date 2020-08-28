import React from "react";
import firebase from "../../firebase";
import "./register.css";
// import {
//   Grid,
//   Form,
//   Segment,
//   Button,
//   Header,
//   Message,
//   Icon,
// } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <h4 className="errors"key={i}>{error.message}</h4>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div class="register-container">
        <div class="image-container">
          <img src={require("./auth-assets/placeholder.png")} alt=""/>
        </div>
        <div class="form-container">
          <div class="form-holder">
            <h1>Login to DevChat.</h1>
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <input
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className="email icon"
                //className={this.handleInputError(errors, "email")}
                type="email"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="password icon"
                onChange={this.handleChange}
                value={password}
              />
              {errors.length > 0 && <div>{this.displayErrors(errors)}</div>}

              <button
                disabled={loading}
                className={ "submit-btn"}
                color='green'
                fluid
                
                size="large"
              >
                Submit
              </button>
            </form>

            <h5>
              Don't have an account? &nbsp;<Link to="/register"><b>Register</b></Link>
            </h5>
          </div>
        </div>
      </div>
      // <Grid textAlign="center" verticalAlign="middle" className="app">
      //   <Grid.Column style={{ maxWidth: 450 }}>
      //     <Header as="h1" icon color="violet" textAlign="center">
      //       <Icon name="code branch" color="violet" />
      //       Login to DevChat
      //     </Header>
      //     <Form onSubmit={this.handleSubmit} size="large">
      //       <Segment stacked>
      //         <Form.Input
      //           fluid
      //           name="email"
      //           icon="mail"
      //           iconPosition="left"
      //           placeholder="Email Address"
      //           onChange={this.handleChange}
      //           value={email}
      //           className={this.handleInputError(errors, "email")}
      //           type="email"
      //         />

      //         <Form.Input
      //           fluid
      //           name="password"
      //           icon="lock"
      //           iconPosition="left"
      //           placeholder="Password"
      //           onChange={this.handleChange}
      //           value={password}
      //           className={this.handleInputError(errors, "password")}
      //           type="password"
      //         />

      //         <Button
      //           disabled={loading}
      //           className={loading ? "loading" : ""}
      //           color="violet"
      //           fluid
      //           size="large"
      //         >
      //           Submit
      //         </Button>
      //       </Segment>
      //     </Form>
      //     {errors.length > 0 && (
      //       <Message error>
      //         <h3>Error</h3>
      //         {this.displayErrors(errors)}
      //       </Message>
      //     )}
      //     <Message>
      //       Don't have an account? <Link to="/register">Register</Link>
      //     </Message>
      //   </Grid.Column>
      // </Grid>
    );
  }
}

export default Login;
