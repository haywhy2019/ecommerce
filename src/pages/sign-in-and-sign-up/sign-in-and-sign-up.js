import React from 'react'
import "./sign-in-and-sign-up.styles.scss"
import SignIn from "../../components/sign-in/sign-in.component"
import Signup from "../../components/sign-up-component/sign-up-component"

function SignInOut() {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn />
            <Signup />
        </div>
    )
}

export default SignInOut
