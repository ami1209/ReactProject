import React, {Component} from 'react';
import MD5 from 'md5';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {generateLoginToken} from '../../Utilities/utilities';
import fetch from 'node-fetch';
import NavigationBar from './NavigationBar';
// import Nav from "./Nav";


const validEmailRegex = 
  RegExp("^[a-zA-Z0-9@._-]*$");

const validateForm = errors => {
   let valid = true;
   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
   return valid;
 };

 const validatePasswordPattern = RegExp("/^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/");

 
class Header extends Component{
   constructor(props){
      super(props)
      this.state = {userName : '',requestIp:'', password: '', loginToken:'', playerToken: '', FPModal:false, show: false, menu: false, errors: {
         userName: '',
         password: '',
       }};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.showMenu = this.showMenu.bind(this);
      // this.setIpAddress = this.setIpAddress(this);
      // this.handleSubmitGetReact = this.handleSubmitGetReact.bind(this);
   }

   showMenu =() =>{
      this.setState({menu: !this.state.menu});
   }

   ForgotPasswordModal = () => {
      this.setState({FPModal:true})
   }

   setIpAddress =() =>{
      fetch('https://geoip-db.com/json')
      .then(res => res.json())
      .then(json => this.setState({requestIp: json.IPv4}));
   }
   showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };

   handleChange= (event) =>{
      event.preventDefault();
      const {name, value} = event.target;
      let errors = this.state.errors;
      var loginToken = '';
      switch (name) {
         case 'userName':
            if(value.length == 0){
               errors.userName = 'Please enter Username/Email';
            }else{
               if(value.match("^[a-zA-Z0-9@._-]*$") != null){
                  errors.userName = ''
               }else{
                  errors.userName = 'Invalid Username/Email Pattern'
               }
            }
           break;
         case 'password': 
         loginToken = generateLoginToken();
            if(value.length == 0 ){
               errors.password = 'Please enter password';
            }
            else if(value.length < 6 || value.length >30){
               errors.password = 'Please enter 6 to 30 characters';
            }
            else{
               if(value.match("^[a-zA-Z0-9@._-]*$") != null){
                 
                  var password = event.target.value;
                  errors.password='';
               }else{
                  errors.password = 'Invalid password pattern';
               }
            }
           break;
         default:
           break;
       }
   
       this.setState({errors, [name]: value, loginToken: loginToken});


   }

   ResubmitForm(){
      let formElement = document.createElement('form');
      formElement.action = "http://local.khelplayrummy.com/component/weaver/?task=authorisation.playerTokenForCookie";
      formElement.method = "POST";
      let mapInput = document.createElement("input");
      mapInput.type = "hidden";
      mapInput.name = "playerToken";
      mapInput.setAttribute("value", this.state.playerToken);
      formElement.appendChild(mapInput);
      document.body.appendChild(formElement);
      formElement.submit()
   }

   handleSubmit(event){
      if(validateForm(this.state.errors)) {
       if(this.state.loginToken == null || this.state.loginToken == ''){
          this.setState({loginToken: generateLoginToken()})
       }
      var enc_pass = (MD5(MD5(this.state.password) + this.state.loginToken));
     this.setIpAddress();
      axios.post('http://local.khelplayrummy.com/component/weaver/?task=authorisation.playerLoginFromReact',
       {"userName":this.state.userName,"password":enc_pass,"loginToken":this.state.loginToken,"requestIp":this.state.requestIp,
       "state":"NA","city":"NA","domainName":"test.khelplayrummy.com","deviceType":"PC",
       "userAgent":"Mozilla\/5.0 (X11; Linux x86_64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.122 Safari\/537.36",
       "loginDevice":"PC_BROWSER"})
       .then((response) => {
         if(response.data.errorCode != 0){
            let errors = this.state.errors;
            errors.userName = response.data.respMsg; 
            this.setState({errors});
         }else{
            this.setState({playerToken : response.data.playerToken});
            this.ResubmitForm();
         }

         // /localStorage.setItem('data', response);
         //  return <Redirect to = "/PostLogin"></Redirect>
         //  window.location.href = "http://local.khelplayrummy.com";
         // console.log(response);
       }, (error) => {
         console.log(error);
       });
      event.preventDefault()
      }
      else{
         console.log('Invalid Form');
      }

   }
    render(){
      const {errors} = this.state;
        return(
            <div>
<header id="sp-header">
   <div className="container">
      <div className="row">
         <div id="sp-logo" className="col-sm-2 col-md-2">
            <LazyLoad>
            <div className="sp-column logo"><a className="logo" href="https://www.khelplayrummy.com/"><img className="sp-default-logo" src="https://d7hf0c5vwwy8u.cloudfront.net/images/logo-diwali.gif?javer=2005250525" alt="Khelplayrummy"/></a></div>
            </LazyLoad>
         </div>
         <div id="sp-top1" className="col-sm-2 col-m d-2">
            <div className="sp-column mob_notify_menu">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <ul>
                           <li className="last"><a onClick={this.showMenu} className="mobile_menubar"><i className="fa fa-bars"></i></a></li>
                        </ul>
                        {this.state.menu?  <SwipeableDrawer open = {this.state.menu} anchor= "right" ModalProps= {{onBackdropClick: this.showMenu}}>
         <NavigationBar></NavigationBar>
         </SwipeableDrawer>:""}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="sp-top2" className="col-sm-2 col-md-2">
            <div className="sp-column mobile_login_btn">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <ul>
                           <li><a href="#" data-toggle="modal" data-target="#home_register"><i className="fa fa-user"></i> Register Now</a></li>
                           <li className="middle"><a onClick={this.showModal} ><i className="fa fa-lock"></i>Login</a></li>
                           {this.state.show ?<div id = "home_login">
      <div className="modal-dialog modal-sm">
      <div className="modal-content">
         <div className="modal-header">
            <button type="button" className="close" onClick={this.hideModal} aria-label="Close"></button>
            <h4 className="modal-title">Start Playing Now</h4>
         </div>
         <div className="modal-body">
            <div className="form_inner">
               <div className="facebook_pop_div">
                  <a onclick="openInPopuop('/component/weaver/?task=facebook.facebooklogin&amp;logtype=login_widget&amp;device=mobile');"></a> 
                  <div className="or_div"><span>OR</span></div>
               </div>
               {/* <form action="/component/weaver/?task=authorisation.playerLogin" method="post" id="login-form-2" submit-type="ajax" validation-style="bottom" tooltip-mode="manual"> */}
               <form onSubmit= {this.handleSubmit}>
                  <div className="form-group">
                  <input placeholder="Username/Email/Mobile" className="custome_input" 
                              value = {this.state.userName} name="userName" 
                              maxlength="50" id="userName" type="text" onChange = {this.handleChange} noValidate />
                     {errors.userName.length > 0 && 
                               <span className='tooltip-inner'>{errors.userName}</span>} 
                  </div>
                  <div className="form-group">
                  <input placeholder="Password" className="custome_input last" name="password" id="password"
                               value = {this.state.password} type="password" onChange = {this.handleChange} noValidate />
                     <div className="show_pa" id="showPwd" onclick="togglePwd();"><i className="fa fa-eye" aria-hidden="true"></i><i className="fa fa-eye-slash" aria-hidden="true"></i></div>
                     {errors.password.length > 0 && 
                                 <span className='tooltip'>{errors.password}</span>}
                  </div>
                  <div className="form-group"><button type="submit" className="brown_bg">Login Now</button></div>
                  <div className="form-group text-center"><a href="#" data-dismiss="modal" data-target="#home_forgot" data-toggle="modal">Forgot password?</a></div>
                  <div className="form-group text-center register_link">Don’t have an account?<br /> <a data-dismiss="modal" data-target="#home_register" data-toggle="modal" className="green_bg" href="#" onclick="ga('send', 'event', 'New-Home-Page-Inside-Login-Now', 'Click', 'Register-For-Free-Button')">Register for Free</a></div>
                  <input name="loginToken" value="loginToken" type="hidden" />
               </form>
            </div>
            <div className="clear"></div>
         </div>
         <div className="modal-footer">
            <p className="text-center footer_desktop">Need Help?    <a href="mailto:support@KhelplayRummy.com" className="popup_mail"> </a>  |  <a href="#" className="popup_chat" onclick="openLiveChat();"> </a></p>
            <div className="footer_mobile"><strong>Need Help?</strong> <a href="#" onclick="openLiveChat();"><span className="chat_icon"> </span><span>Live support</span></a> <a href="mailto:support@KhelplayRummy.com"><span className="mail_icon"> </span><span>Email Us</span></a> </div>
         </div>
      </div>
   </div>
   </div>: <div></div>}
                           <li className="mobile_menubar" style= {{display: "none"}}><a menu-toggler="true" className="mobile_menubar"><i className="fa fa-bars"></i></a></li>

                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="sp-loginbox" className="col-sm-2 col-md-2">
            <div className="sp-column top_login">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        {/* <form action="http://local.khelplayrummy.com/component/weaver/?task=authorisation.playerLogin" method="post" id="login-form-1" submit-type="ajax" validation-style="left" tooltip-mode="bootstrap" error-callback="topLoginBox"> */}
                        <form onSubmit= {this.handleSubmit}>
                           <fieldset>
                              <input placeholder="Username/Email/Mobile" className="custome_input" 
                              value = {this.state.userName} name="userName" 
                              maxlength="50" id="userName" type="text" onChange = {this.handleChange} noValidate />
                              {errors.userName.length > 0 && 
                               <span className='tooltip-inner'>{errors.userName}</span>} 
                              <input placeholder="Password" className="custome_input last" name="password" id="password"
                               value = {this.state.password} type="password" onChange = {this.handleChange} noValidate />
                               {errors.password.length > 0 && 
                                 <span className='tooltip'>{errors.password}</span>}
                           </fieldset>
                           <fieldset className="text-center">
                              <input className="brown_bg" placeholder="Login" value="Login" type="submit" /> 
                              <span><button onClick={this.ForgotPasswordModal}>Forgot Password?</button></span>
                           </fieldset>
                           <input name="loginToken" value="loginToken" type="hidden" />
                        </form>
                        <div className="facebook_login">
                           <a onclick="openInPopuop('/component/weaver/?task=facebook.facebooklogin&amp;logtype=login_widget');" onmouseover="" style={{cursor: "pointer"}}><img src="https://d7hf0c5vwwy8u.cloudfront.net/templates/shaper_helix3/images/home/facebook_login_btn.png" alt="facebook login" /></a> 
                           <p>By logging, you agree to our <a href="https://www.khelplayrummy.com/terms">T&amp;C</a></p>
                        </div>
                        <div id="fb-alert-modal-log" className="modal fade" role="dialog">
                           <div className="modal-dialog">
                              <div className="modal-content">
                                 <div className="modal-header">

                                    <button type="button" className="close" data-dismiss="modal">x</button>
                                    <h4 className="modal-title"><strong>Alert</strong></h4>
                                 </div>
                                 <div className="modal-body">
                                    <div className="alert alert-danger">
                                       <ul>
                                          <li>Unable to fetch email address.</li>
                                          <li>Either you have no email associated with your facebook account.</li>
                                          <li>Or you need to allow email from facebook account.</li>
                                       </ul>
                                    </div>
                                 </div>
                                 <div className="modal-footer"><button type="button" className="btn btn-default" data-dismiss="modal">Close</button></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
            <NavigationBar></NavigationBar>
         
      </div>
   </div>
</header>
          
         </div>
        )
    }
}


export default Header;