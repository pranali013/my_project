/*import Home from "./components/home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MenuHome from "./components/MenuHome";
import Offers from "./components/Offers";
import Cart from "./components/Cart";
import Help from "./components/Help";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SimpleChart from "./components/Simplechart";
import CourseChart from "./components/Coursechart";
import {useState} from 'react';

import Table from "./components/Table";
import {link} from 'react-scroll';
import FileUpolad from "./components/Table";
import Piechart from "./components/Piechart";

import Supervisor from "./components/Supervisor";

import FileUpload from "./components/FileUpload";
import Slideshow from "./components/Slideshow";

import { Translation } from "react-i18next";


function App() {
    return(

        
        

      <div>
     

       
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/fileupload" element={<FileUpload/>}/>
                    <Route path="/simplechart" element={<SimpleChart/>}/>
                    <Route path="/slideshow" element={<Slideshow/>}/>
                    <Route path="/coursechart" element={<CourseChart/>}/>
                    <Route path="/piechart" element={<Piechart/>}/>
                    <Route path="/table" element={<Table/>}/>
                    <Route path="/supervisor" element={<Supervisor/>}/>
                </Routes>
            </Router>
        </div>
      
    );
    
}




export default App;
*/
import React from 'react'
import firebase from './components/firebase'
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {  signInWithPhoneNumber } from "firebase/auth";



class App extends React.Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{

    
const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("recaptcha verified")
        },
        defaultCountry: "IN"

      }, auth);
      
    
    /*window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
     
    });*/

  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
  
    const appVerifier = window.recaptchaVerifier;
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          alert("otp sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          alert("sms not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code =this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("user is verifieed")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert("otp is wrong")
    });
  }
  render() {
    return (
      <div className='main'>
        <h2>Login Form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button" ></div>
          <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
          <button type="submit" name='log'>Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={this.onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
          <button type="submit" name='submit'>Submit</button>
        </form>
      </div>
    )
  }
}
export default App