import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import {auth, signinWithGoogle } from "../../firebase/firebase.utils";
export class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const {email, password} = this.state
    try {
        await auth.signInWithEmailAndPassword(email, password)
        this.setState({ email: "", password: "" });
    }catch (err){
console.log(err)
    }
   
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            required
            onChange={this.handleChange}
            label="email"
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
            label="password"
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signinWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
