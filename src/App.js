
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom"
import HomePage from "./pages/homepage/homepage"
import ShopPage from "./pages/shop/shop"
import Header from "./components/header/header.component"
import SignInOut from "./pages/sign-in-and-sign-up/sign-in-and-sign-up"
import CheckoutPage from "./pages/checkout/checkout.component"
import {auth, createUserProfileDocument} from "./firebase/firebase.utils"
import React , {lazy, Suspense} from 'react';
import {connect} from "react-redux"
import {setCurrentUser} from "./redux/user/user.actions"
import {selectCurrentUser} from "./redux/user/user.selector"
import {createStructuredSelector} from "reselect"

import ErrorBoundary from './errorBoundary/errorBoundary';

//added lazy load and commented out normal import
// const ShopPage = lazy(() => import("./pages/shop/shop"))
// const  Header = lazy(() => import("./components/header/header.component"))
// const SignInOut = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up"))
// const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"))
class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props

   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if(userAuth){
       const userRef = await  createUserProfileDocument(userAuth)
       userRef.onSnapshot(snapShot => {
          setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
           }) 
       })
      
     }
    setCurrentUser(userAuth)
   
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
  return (
    <div >
      <Header/>
      <Switch>
        {/* <ErrorBoundary> */}
    <Suspense fallback={<div>....loading</div>}>
     <Route exact path="/" component={HomePage} />
     <Route path="/shop" component={ShopPage} />
     <Route exact path="/checkout" component={CheckoutPage} />
     <Route exact path="/signin" render={() =>this.props.currentUser ? (<Redirect to="/" />) : <SignInOut /> } />
     </Suspense>
     {/* </ErrorBoundary> */}
     </Switch>
    </div>
  );
}
}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
