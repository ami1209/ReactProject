import React, {Component} from 'react';
import Slider from "react-slick";
// import '../../css/flexslider.css';
// import '../../css/home.css';
// import '../../css/header.css';
import LazyLoad from 'react-lazy-load';
// import '../../css/body-m.css';
// import '../../css/header-m.css';

class Tab extends Component{
   render(){
      return(
        <div className="tab">
           <div className="title flex jc-btwn" onClick={()=>{
          this.props.handleclick(this.props.id)
          }}>
             <span>{this.props.title}</span>
            <i className={this.props.active?"fas fa-minus" : "fas fa-plus"}></i>
           </div>
          <div className={this.props.active ? "content show" : "content hide"}>
             {this.props.content}
          </div>
        </div>
     )
   }
 } 

class Body extends Component{
   constructor(props) {
      super(props);
      console.log(props);
      this.state = {
         tabs: [
           {
             id: 1,
            title: "tab 1",
            content: "this is tab 1",
            active: true
          },
          {
             id: 2,
            title: "tab 2",
            content: "this is tab 2",
            active: false
          },
          {
             id: 3,
            title: "tab 3",
            content: "this is tab 3",
            active:false
          }
        ]
      }
      this.handleTabClick = this.handleTabClick.bind(this);
      this.updateTabs = this.updateTabs.bind(this);
    }
    
    updateTabs(id){
       let tabs  = this.state.tabs;
      let newtabs = tabs.map((tab, index)=>{
        if(tab.id === id){
          if(tab.active === true){
             tab.active = false;
          }else{
             tab.active = true;
          }
        }else{
          tab.active = false;
        }
        return tab;
      });
      return newtabs;
    }
    
    handleTabClick(id){
      this.setState({tabs: this.updateTabs(id)});
    }
    render(){
       var imgSlider = {
         autoplay:true,
         autoplaySpeed:3000,
         infinite: true,
         initialSlide: 0,
          lazyLoad: 'ondemand',
       }
      var settings = {
         autoplay:true,
         autoplaySpeed:4000,
         infinite: true,
         speed: 500,
         initialSlide: 0,
         slidesToShow: 3,
      slidesToScroll: 3,
       };
        return(
            <div>
                 <section id="sp-banner" className="banner">
               <div className="row">
                  <div id="sp-english" className="col-sm-12 col-md-12">
                     <div className="sp-column ">
                        <div className="sp-module ">
                           <div className="sp-module-content">
                              <div className="custom" >
                              <div className="slider banner_withform">
                              <div>
                              <Slider {...imgSlider}>
                            <div className="is-maharashtra">
                               <LazyLoad>
                               <div className="slide_bg" style={{backgroundImage: "url('https://d7hf0c5vwwy8u.cloudfront.net/images/landing/200-welcome-bonus/home-slider/english/home-page.jpg')", backgroundPostion: "center"}}>
                                  <div className="banner_container">
                                     <div className="row">
                                        <div className="banner_text"></div>
                                        <div className="clear"></div>
                                     </div>
                                  </div>
                            </div>
                            </LazyLoad>
                         </div>
                         <div>
                            <div className="is-maharashtra">
                            <LazyLoad>
                               <div className="slide_bg" style={{backgroundImage: "url('https://d7hf0c5vwwy8u.cloudfront.net/images/landing/monsoon-gold-coin-dhamaka/english/home-slider/home-page.jpg')",
                               backgroundPostion: "no-repeat center center"}}>
                                  <div className="banner_container">
                                     <div className="row">
                                        <div className="banner_text"><a href="https://www.khelplayrummy.com/dhanvarsha-offer-2020" className="green_bg">Know More</a></div>
                                        <div className="clear"></div>
                                     </div>
                                  </div>
                               </div>
                               </LazyLoad>
                            </div>
                         </div>
                         </Slider>
                         
<div className="container">
   <div className="home_register_form1" id="homeregisterdiv">
      <div className="form_inner">
         <div className="moduletable">
            <form action="#" method="post" id="registration-form-100" className="" submit-type="ajax" validation-style="bottom" tooltip-mode="bootstrap" autocomplete="off">
               <div className="facebook_reg">
                  {/* <a onclick="openInPopuop('/component/weaver/?task=facebook.facebooklogin&logtype=register_widget');" onmouseover style="cursor: pointer;"><img src="https://d7hf0c5vwwy8u.cloudfront.net/templates/shaper_helix3/images/home/facebook_reg_btn_new.png?javer=2005250525"></a>  */}
                  <div className="or_div"><span>OR</span></div>
               </div>
               <div className="form_item_holder" style={{display:"none", visibility: "hidden"}} >
                  <input type="text" className="" id="userName" name="userName" maxlength="50" placeholder='Username (5-21 Characters)'/> 
                  <div className="error_tooltip manual_tooltip_error" id="error_userName"></div>
               </div>
               <div className="form_item_holder" style={{display:"none", visibility: "hidden"}}>
                  <input type="text" className=" " id="userInfo" name="userInfo" maxlength="50" placeholder='Email/Mobile' /> 
                  <div className="error_tooltip manual_tooltip_error" id="error_userInfo"></div>
               </div>
               <div className="form_item_holder" >
                  <input type="email" className="" id="email" name="email" maxlength="50" placeholder='Email Address' EmailSuggestion="true" autocomplete="off"/> 
                  <div className="error_tooltip manual_tooltip_error" id="error_email"></div>
               </div>
               <div className="form_item_holder">
                  <input type="password" className="" id="reg_password" name="reg_password" maxlength="30" placeholder='Password (At least 6 Characters)' autocomplete="off"/> 
                  <div className="error_tooltip manual_tooltip_error" id="error_reg_password"></div>
               </div>
               <div className="form_item_holder" >
                  <input type="tel" className=" allow_only_nums" id="mobile" name="mobile" placeholder='Mobile No. (10 Digit Number)' maxlength="10" pattern="^[5-9]{1}[0-9]{9}$"/> 
                  <div className="error_tooltip manual_tooltip_error" id="error_mobile"></div>
               </div> 
               <div className="button_holder"> <button type="submit" className="brown_bg">Register for Free</button> </div>
               <input type="hidden" id="submiturl" name="submiturl" value="/after-registration"/> <input type="hidden" name="otp_enable" id="otp_enable" value="0"/> <input type="hidden" name="callFrom" id="callFrom" value="LANDINGPAGE"/> 
               <div id="fb-alert-modal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <button type="button" className="close" data-dismiss="modal">Ã—</button>
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
            </form>
             
         </div>
      </div>
      <div className="form_footer">
         <div className="form-group">
            <p className="no_crcard text-center">By registering, you agree to our <a href="https://www.khelplayrummy.com/terms">T&amp;C</a></p>
         </div>
      </div>
   </div>
</div>
                         </div>
                      
                                  </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
                <section id="sp-testimonial-slider" className="testimonial-slider">
   <div className="container">
      <div className="row">
         <div id="sp-testimonial-slider" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <h1 className="section_heading" style={{paddingLeft: "10px", paddingRight: "10px"}}>Play Online Rummy Games</h1>
                       
                        <div className="clear"></div>
                        <div className="slider winners_speak_slider">
                        <Slider {...settings}>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">My first priority is my family, second is Cricket. But off season, I playing rummy card games on KhelPlay Rummy and this time fortunately winning 50 thousand rupees in the Khiladiyon Ka Khiladi tournament.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner7"></div>
                                    <div className="winner_name"><span>nilrshthakur446</span> Raigarh, Maharashtra</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I feel awesome after winning KhelPlay Rummy’s Smartphone Tournament! My experience of playing online Rummy at KhelPlay Rummy has been exceptional!</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner8"></div>
                                    <div className="winner_name"><span>Suguna</span> Qutubullapur, Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">Wow! First of all I like to thank KhelPlay Rummy. I won the Smartphone Tournament and I can't explain how much happy I am! So, I will keep playing on KhelPlay Rummy!</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner9"></div>
                                    <div className="winner_name"><span>krchsreedhar</span> Rajahmundry, Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I feel very happy. I won 5-gram gold coin in Festive Special Tournament. I never thought I will win. It is a very thrilling victory for me. Tankyou so much KhelPlay Rummy for the tournament.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner1"></div>
                                    <div className="winner_name"><span>meerasettu01</span> Gopalapuram, Tamil Nadu</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">This year I got the best Diwali gift from KhelPlay Rummy. Very happy to win the 3<sup>rd</sup> prize <span className="rupees-symbol">`</span>50,000 in their Diwali Dhamaka Tourney. Thank you KhelPlay Rummy, the best online rummy app. ever.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner2"></div>
                                    <div className="winner_name"><span>nareshnk970</span> Mundra, Gujarat</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>25000 in KhelPlay rummy’s Khiladiyon ka Khiladi 5 lakh tournament, I am very happy, get best online rummy experience and instant wins only at KhelPlay Rummy.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner3"></div>
                                    <div className="winner_name"><span>Pvinnu007</span> Nellore, Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>51,000 in Mega Million Tournaments. I really enjoyed playing rummy in khelplay, especially the tournaments which gives us chance to win huge amount. Thnx to khelplay Rummy</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner4"></div>
                                    <div className="winner_name"><span>uday654</span> Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">Kal Maine <span className="rupees-symbol">`</span>50000 hajar rupees jita KhelPlay Rummy ke Khiladiyon ka Khiladi 5lakh tournament main. Mujhe bahut Aacha laga. Surakshit aur sabse jada jeet chahiye to khele KhelPlay Rummy ke sath.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner5"></div>
                                    <div className="winner_name"><span>Nareshtare</span> Thane, Maharashtra</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>40,000 in Shark shiver Tournament, I am very happy to share my feedback. Most important thing is khelplayrummy process withdrawal amount in same day.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner6"></div>
                                    <div className="winner_name"><span>Dhanesh007</span> Tamil Nadu</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I am happy on winning the 2nd Rank in the Mega Mobile Dhamaka Tournament on 16/05/2016</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner10"></div>
                                    <div className="winner_name"><span>prak2566</span> Surat, Gujarat</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won Rank 2 in the Navartri Nostalgia Tournament on 16<sup>th</sup> Oct at 10.00 PM , Prize 1 Titan Watch. I thank you very much for your support Team.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner11"></div>
                                    <div className="winner_name"><span>premadeva</span> Bangalore, Karnataka</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">Ever since i joined Khelplay Rummy , my daily frustrated life change alot into a shower of blessings. Everything about Khelplay Rummy is so awesome, on top of that I also won 50000 in the Khiladiyon ka Khiladi tournament</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner12"></div>
                                    <div className="winner_name"><span>Baba2019</span> Nagaland</div>
                                 </div>
                              </div>
                           </div>
                        </Slider>
                        </div>
                        <div className="clear"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section id="sp-geting-started" className="geting_started">
   <div className="container">
      <div className="row">
         <div id="sp-user1" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <p></p>
                        <div className="step">
                           <ul>
                              <li>
                                 <span className="icon step1"><a href="#" data-target="#how_to_register" data-toggle="modal" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Create-Free-Rummy-Account-Icon')"> </a></span> 
                                 <p><span className="title">Create Free Rummy Account</span>Get 150% Bonus up to <span className="rupees-symbol">`</span>1500<span className="link"><a href="#" data-toggle="modal" data-target="#how_to_register" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Create-Free-Rummy-Account')">How to register?</a></span></p>
                              </li>
                              <li>
                                 <span className="icon step2"><a href="#" data-target="#how_to_deposit" data-toggle="modal" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Deposit-Cash-Icon')"> </a></span> 
                                 <p><span className="title">Add Cash</span>Get instant access to real money Rummy games<span className="link"><a href="#" data-target="#how_to_deposit" data-toggle="modal" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Deposit-Cash')">How to Add Cash?</a></span></p>
                              </li>
                              <li>
                                 <span className="icon step3"><a href="https://www.khelplayrummy.com/rummy-rules" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Play-And-Win-Icon')"> </a></span> 
                                 <p><span className="title">Play and Win</span>Enjoy your online Rummy games<span className="link"><a href="https://www.khelplayrummy.com/rummy-rules" onclick="ga('send', 'event', 'New-Home-Page', 'Click', 'Play-And-Win')">Rules of Rummy</a></span></p>
                              </li>
                           </ul>
                        </div>
                        <LazyLoad>
                        <div className="geting_started_img"><img alt="Play Rummy On PC, Mobile and Tablet
                           " src="https://d7hf0c5vwwy8u.cloudfront.net/images/home/geting_started_img.webp?javer=2005190236" /></div>
                           </LazyLoad>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
                <section id="sp-download-app-strip" className="download_app_strip">
   <div className="container">
      <div className="row">
         <div id="sp-user2" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <p><span>Download Rummy App</span> <a href="http://m.onelink.me/92912a27" target="_blank" className="app_store"> </a> <a href="https://go.onelink.me/app/2eb1c5fd" className="android_real"> </a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section id="sp-why-play" className="why_play">
   <div className="container">
      <div className="row">
         <div id="sp-user3" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <h2 className="section_heading">Online Rummy Cash Games &amp; Tournaments</h2>
                        <div className="row" style={{margin: "0"}}>
                           <div className="col-md-12 col-sm-12 col-xs-12 featurescontent">
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                 <span className="icon_outer"><span className="icon1"> </span></span> 
                                 <p><samp>Classic Rummy Online</samp></p>
                                 <ul>
                                    <li>Pool, Points &amp; Deals Rummy</li>
                                    <li>Mobile app available in Android and iOS</li>
                                    <li>Seamless switching between Desktop and Mobile</li>
                                 </ul>
                              </div>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                 <span className="icon_outer"><span className="icon2"> </span></span> 
                                 <p><samp>Top-notch Security System</samp></p>
                                 <ul>
                                    <li>SSL secured</li>
                                    <li>PG PCI compliant</li>
                                    <li>Secured Credentials</li>
                                 </ul>
                              </div>
                              <div className="clear"></div>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                 <span className="icon_outer"><span className="icon3"> </span></span> 
                                 <p><samp>Easy Deposit and Quick Withdrawal</samp></p>
                                 <ul>
                                    <li>Multiple Payment Options</li>
                                    <li>Fastest Withdrawals - Processed within 24 Hours</li>
                                    <li>Playing Rummy online is absolutely legal in India</li>
                                 </ul>
                              </div>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                 <span className="icon_outer"><span className="icon4"> </span></span> 
                                 <p><samp>Attractive Features</samp></p>
                                 <ul>
                                    <li>Minimum 150% Welcome Bonus</li>
                                    <li>Earn Cash by referring your Friends</li>
                                    <li>Win Real Cash - We are giving away <span className="rupees-symbol">`</span>5,35,000* every month for FREE!</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>

<section id="sp-mainbody" className="main_body">
   <div className="container">
      <div className="row">
         <div id="sp-component" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div id="system-message-container"> </div>
               <div className="blog-featuredhome_page" itemscope itemtype="http://schema.org/Blog"> </div>
            </div>
         </div>
      </div>
   </div>
</section>
            </div>
        )
    }
}

export default Body;