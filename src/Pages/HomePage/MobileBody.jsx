import React, {Component} from 'react';
import Slider from "react-slick";
import LazyLoad from 'react-lazy-load';
import '../../css/home-combined-mobile.css';

class MobileBody extends Component{
    render(){
       var imgSlider = {
         autoplay:true,
         autoplaySpeed:3000,
         infinite: true,
         initialSlide: 0,
         lazyLoad: true,
       }
        var settings = {
           autoplay:true,
           autoplaySpeed:4000,
           infinite: true,
           speed: 500,
           initialSlide: 0,
           slidesToShow: 1,
        slidesToScroll: 1,
         };
         return(
             <div><section id="sp-banner" className="banner">
             <div className="row">
                <div id="sp-english" className="col-sm-12 col-md-12">
                   <div className="sp-column ">
                      <div className="sp-module ">
                         <div className="sp-module-content">
                            <div className="custom" >
                               <div className="slider home_mobile_banner">
                                  <div>
                                  <Slider {...imgSlider}>
                                     <div>
                                        <div className="is-english">
                                           <LazyLoad>
                                           <div className="slide_bg" style={{background: "url('https://d7hf0c5vwwy8u.cloudfront.net/images/landing/200-welcome-bonus/home-slider/english/home-page-mobile.jpg')",
                                           backgroundPosition: "no-repeat center center"}}>
                                              
                                           <div className="banner_container">
                                              <div className="row">
                                                 <div className="banner_text"></div>
                                              </div>
                                           </div>
                                        </div>
                                        </LazyLoad>
                                     </div>
                               </div>
                               <div>
                               <div className="is-english">
                               <LazyLoad>
                               <div className="slide_bg" style={{background: "url('https://d7hf0c5vwwy8u.cloudfront.net/images/landing/monsoon-gold-coin-dhamaka/english/home-slider/home-page-mobile.jpg')",
                               backgroundPostion: "no-repeat center center"}}>
                               <div className="banner_container">
                               <div className="row">
                               <div className="banner_text"><a href="/monsoon-gold-coin-dhamaka-2020" className="green_bg">Know More</a></div>
                               </div>
                               </div>
                               </div>
                               </LazyLoad>
                               </div>
                            </div>
                            </Slider>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             </div>
             </div>
          </section>
          <div className="scrollToTopdiv">
             <div className="container"> <a href="#" className="scrollToTop">Scroll To Top</a> </div>
          </div>
          {/* <script type="text/javascript" src={jQuery} async="async" defer="defer"></script>
          <script type="text/javascript" src={placeHolder} async="async" defer="defer"></script>
          <script type="text/javascript" src={Accordion} async="async"></script>
          <script src={JQueryScroll} type="text/javascript" async="async" defer="defer"></script>
          <script type="text/javascript" src={Isotope} async="async" defer="defer"></script>
          <script src={Custome} type="text/javascript" async="async" defer="defer"></script> */}
          {/* <ScriptTag type="text/javascript" src="../../templates/js/custom/clevertap_implementation.js?v=19.34" ></ScriptTag> */}
          {/* <script>cleverTapWebPushNotifications();</script> */}
          <div className="modal fade coming_soon" id="whitelist_notification_modal" aria-hidden="true" style={{display: "none"}}>
             <div className="modal-dialog modal-sm">
                <div className="modal-content">
                   <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"> </button>
                      <h4 className="modal-title">Country/State is banned</h4>
                   </div>
                   <div className="modal-body">
                      <div className="form_inner">
                         <div className="form-group modal-manual-content"> User is not whitelisted. </div>
                         <div className="form-group text-center"> <a href="#"  onClick={e => e.preventDefault()} id="whitelist_notification_ok_btn" className="brown_bg" data-toggle="modal" data-dismiss="modal" >Ok</a> </div>
                      </div>
                      <div className="clear"></div>
                   </div>
                </div>
             </div>
          </div>
          
          
                 <section id="sp-testimonial-slider" className="testimonial-slider">
   <div className="container">
      <div className="row">
         <div id="sp-testimonial-slider" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <div className="section_heading" style={{paddingLeft: "10px", paddingRight: "10px"}}>Play Online Rummy Games</div>
                        <div className="clear"></div>
                        <div className="slider winners_speak_slider">
                        <Slider {...settings}>
                           {/* <LazyLoad> */}
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">My first priority is my family, second is Cricket. But off season, I playing rummy card games on KhelPlay Rummy and this time fortunately winning 50 thousand rupees in the Khiladiyon Ka Khiladi tournament. I am very happy!</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner7"> </div>
                                    <div className="winner_name"><span>nilrshthakur446</span> Raigarh, Maharashtra</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I feel awesome after winning KhelPlay Rummy’s Smartphone Tournament! My experience of playing online Rummy at KhelPlay Rummy has been exceptional!</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner8"> </div>
                                    <div className="winner_name"><span>Suguna</span> Qutubullapur, Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">Wow! First of all I like to thank KhelPlay Rummy. I won the Smartphone Tournament and I can't explain how much happy I am! So, I will keep playing on KhelPlay Rummy!</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner9"> </div>
                                    <div className="winner_name"><span>krchsreedhar</span> Rajahmundry, Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I feel very happy. I won 5-gram gold coin in Festive Special Tournament. I never thought I will win. It is a very thrilling victory for me. Tankyou so much KhelPlay Rummy for the tournament.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner1"> </div>
                                    <div className="winner_name"><span>meerasettu01</span> Gopalapuram, Tamil Nadu</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">This year I got the best Diwali gift from KhelPlay Rummy. Very happy to win the 3<sup>rd</sup> prize <span className="rupees-symbol">`</span>50,000 in their Diwali Dhamaka Tourney. Thank you KhelPlay Rummy, the best online rummy app. ever.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner2"> </div>
                                    <div className="winner_name"><span>nareshnk970</span> Mundra, Gujarat</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>25000 in KhelPlay rummy’s Khiladiyon ka Khiladi 5 lakh tournament, I am very happy, get best online rummy experience and instant wins only at KhelPlay Rummy.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner3"> </div>
                                    <div className="winner_name"><span>Pvinnu007</span> Nellore,Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>51,000 in Mega Million Tournaments. I really enjoyed playing rummy in khelplay, especially the tournaments which gives us chance to win huge amount. Thnx to khelplay Rummy</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner4"> </div>
                                    <div className="winner_name"><span>uday654</span> Andhra Pradesh</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">Kal Maine <span className="rupees-symbol">`</span>50000 hajar rupees jita KhelPlay Rummy ke Khiladiyon ka Khiladi 5lakh tournament main. Mujhe bahut Aacha laga. Surakshit aur sabse jada jeet chahiye to khele KhelPlay Rummy ke sath.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner5"> </div>
                                    <div className="winner_name"><span>Nareshtare</span> Thane, Maharashtra</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won <span className="rupees-symbol">`</span>40,000 in Shark shiver Tournament, I am very happy to share my feedback. Most important thing is khelplayrummy process withdrawal amount in same day.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner6"> </div>
                                    <div className="winner_name"><span>Dhanesh007</span> Tamil Nadu</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I am happy on winning the 2nd Rank in the Mega Mobile Dhamaka Tournament on 16/05/2016</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner10"> </div>
                                    <div className="winner_name"><span>prak2566</span> Surat, Gujarat</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I won Rank 2 in the Navartri Nostalgia Tournament on 16<sup>th</sup> Oct at 10.00 PM , Prize 1 Titan Watch. I thank you very much for your support Team.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner11"> </div>
                                    <div className="winner_name"><span>premadeva</span> Bangalore, Karnataka</div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className="winners_speak_div">
                                 <div className="winner_text">I am so happy that I won a prize in a tournament and also thankful to your team for making a wonderful game.</div>
                                 <div className="winner_pin_name">
                                    <div className="winner_pic winner12"> </div>
                                    <div className="winner_name"><span>vamshi89</span> Hyderabad , Telangana</div>
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
                                 <span className="icon step1"><a href="#" data-target="#how_to_register" data-toggle="modal" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Create-Free-Rummy-Account-Icon')"> </a></span> 
                                 <p><span className="title">Create Free Rummy Account</span>Get Flat 200% Bonus up to Rs. 1Lakh<span className="link"><a href="#" data-toggle="modal" data-target="#how_to_register" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Create-Free-Rummy-Account')">How to register?</a></span></p>
                              </li>
                              <li>
                                 <span className="icon step2"><a href="#" data-target="#how_to_deposit" data-toggle="modal" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Deposit-Cash-Icon')"> </a></span> 
                                 <p><span className="title">Add Cash</span>Get instant access to real money Rummy games<span className="link"><a href="#" data-target="#how_to_deposit" data-toggle="modal" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Deposit-Cash')">How to Add Cash?</a></span></p>
                              </li>
                              <li>
                                 <span className="icon step3"><a href="/rummy-rules" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Play-And-Win-Icon')"> </a></span> 
                                 <p><span className="title">Play and Win</span>Enjoy your online Rummy games<span className="link"><a href="/rummy-rules" onClick="ga('send', 'event', 'New-Home-Page', 'Click', 'Play-And-Win')">Rules of Rummy</a></span></p>
                              </li>
                           </ul>
                        </div>
                        <LazyLoad>
                        <div className="geting_started_img"><span></span></div>
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
                                    <li>Flat 200% Welcome Bonus</li>
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
{/* <section id="sp-seo-content" className="seo_content">
   <div className="container">
      <div className="row">
         <div id="sp-user4" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div className="sp-module ">
                  <div className="sp-module-content">
                     <div className="custom" >
                        <p></p>
                        <div className="accordion_example2">
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>Why Is Khel Play Rummy the Best Website to Play Rummy Online?</h3>
                              </div>
                              <div className="acc_content">Khelplayrummy.com: India's Premium Website to Play <span className="strong">Indian Rummy Online</span> to win cash. Traditional Indian rummy card game is a fun-filled game which since ages has been a great source of entertainment within friend and family circles. The classic <span className="strong">rummy card game</span> has usually found its place in social gatherings such as family get together and outings occasioned by festivals, anniversaries and other celebrations as a source of pure unadulterated fun! Popular as a skill-based game, the young, old, men and women alike are known to take great delight playing this centuries-old game. Khel Play Rummy is the perfect platform to play a rummy card game; where relationships can be forged among people spanning different generations! <br /> <br /> Playing Rummy at home with a physical pack of cards is now passé. In the age of the internet, KhelPlay Rummy brings to you the digital version of the traditional 13 cards Indian rummy or 21 cards Indian rummy that can be played with ease on your desktops/laptops/tablets and mobiles. And did you know you can play rummy online for real cash on KhelPlay Rummy? Loaded with exciting new features, playing online rummy game with Khel Play Rummy is an experience that will keep you hooked and craving for more! So, what are you waiting for? Start playing real cash rummy with KhelPlay Rummy!</div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>Where can I download the app to play rummy online?</h3>
                              </div>
                              <div className="acc_content">
                                 Download KhelPlay Rummy App onto your Android or iOS device now and start playing real cash rummy online along with thousands of other players who are part of the mobile rummy bandwagon! Enjoy online Rummy game on the move as the KhelPlay Rummy App allows you to indulge in your online Rummy playing passion, anywhere, anytime with just a few taps on your Android or iOS device! Playing real cash rummy was never so easy. <br /> <br /> Featuring an advanced game lobby that is optimized to player needs, KhelPlay Rummy mobile app allows you to play online rummy game in a safe and hassle-free fashion. Download rummy mobile app – rummy app for android (phones &amp; tablets) and rummy app for iOS(iPad &amp; iPhones) and start playing free rummy game online from anywhere, anytime with players spread across India! <br /> <br /> <span className="strong">Features of the KhelPlay Rummy app:</span><br /> <br />
                                 <ul>
                                    <li>Highly Navigable Interface to Play Rummy Games Online</li>
                                    <li>Advanced Safety Features for Foolproof Security</li>
                                    <li>Quick and Easy Facility for Withdrawal and Deposits</li>
                                 </ul>
                                 <span className="strong">This rummy app enables users to:</span><br /> <br />
                                 <ul>
                                    <li>Play free rummy game online</li>
                                    <li>Play online rummy for cash</li>
                                    <li>Deposit and Withdraw Money in a secure fashion</li>
                                    <li>Switch seamlessly between desktop and mobile devices such as iPhones, iPads and Tablets</li>
                                 </ul>
                                 The KhelPlay Rummy app can be downloaded for FREE by both new as well as existing registered users on their Android and iOS devices. To start playing real cash rummy online for free using rummy app, registered users can use the same username (access details) which they use while playing on their desktops or laptops, while new users can register for free via the rummy app. Start playing real cash rummy online for free by downloading the rummy app onto your Android or iOS device, click on one of the options below:<br /> <a href="https://go.onelink.me/app/2eb1c5fd" rel="alternate">Rummy App for Android</a> | <a href="http://m.onelink.me/92912a27" rel="alternate">Rummy App for iOS</a>
                              </div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>Why Is KhelPlay Rummy The Best Indian Rummy Card Game Network?</h3>
                              </div>
                              <div className="acc_content"><span className="strong"><a href="/13-card-rummy-game" rel="alternate">13 Cards Indian Rummy</a></span> is a card game that has perpetually enjoyed popularity amongst Indian audiences. A game that was limited to within the confines of close friend and family circles has now expanded its horizons and entered the online realm in the age of fast internet! And KhelPlay Rummy is proud to be leading from the front with its innovative online version of 13 cards Indian Rummy which you can play with online rummy players across India who are equally passionate about the game. <br /> <br /> The market is currently inundated with a lot of online rummy sites but what makes KhelPlay Rummy stand out from the rest is the user-friendly interface that promises a riveting free online rummy experience for all users. KhelPlay Rummy makes it extremely easy to get started with playing real rummy online for free. <br /> <br /> KhelPlay Rummy acts as a perfect platform to sharpen your analytical skills and offers you the chance to face off with leading online rummy players from across the country, all this while you rake in the moolah while you play rummy games!! Real money is up for the grabs, and the only thing between you and the cash rewards are your rummy skills! Play rummy online with real money only on KhelPlay Rummy. <br /> <br /> Locally referred to as ‘Paplu,’ the Indian Rummy can be said to be largely inspired from Gin Rummy &amp; Rummy 500 and is as much fun to play as any of its Western cousins. There are two popular versions of India Rummy games played across India, 13 Cards Rummy &amp; 21 Cards Rummy. 13 Cards Indian Rummy and 21 Cards Indian Rummy, the two versions are so named because of the number of cards being dealt to each player at the start if the rummy card game, which are 13 and 21, respectively. These two versions are traditionally played in homes among family members and groups of individuals on festive occasions as well as during friendly get-togethers like kitty parties, marriages and anniversaries. These rummy card games enjoy widespread popularity in clubs and card rooms across India and are also indulged in as a leisurely pastime activity by people traveling on long-distance trains in India. With access to various free online rummy sites like KhelPlay Rummy, the ease of playing a game of real rummy online for free across the web with another rummy enthusiast is what attracts people towards Online Rummy in its different forms. Also, hassle-free online payment with online support and call support being made available to Players makes it a completely safe and trustworthy platform to play the rummy card game for free. KhelPlay Rummy allows its players to play rummy online for real cash using its mobile rummy app.<br /> <br /> So why is KhelPlayRummy.com the best rummy website on the planet, you may ask? It’s simple; KhelPlay Rummy takes user experience very seriously. KhelPlay Rummy offers a seamless experience when it comes to playing rummy online, with the opportunity to win huge cash rewards. Players can enjoy online rummy card games anywhere and anytime using our <span className="strong"><a href="/mobile-rummy-app" rel="alternate">mobile rummy app</a></span>. With plenty of options to deposit cash and a 100% secure platform, KhelPlay Rummy offers rummy enthusiasts an online rummy experience that is second to none. KhelPlay Rummy has always strived to provide its players with the best rummy experience, and a true testimony to that would be the lakhs of happy rummy enthusiasts playing online rummy card games on our platform. Playing rummy online for free was never so easy and secure; if it’s real rummy nirvana that you are after, you can’t go wrong with KhelPlay Rummy.</div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>What Are the Various Forms of Free Online Rummy Games?</h3>
                              </div>
                              <div className="acc_content">KhelPlay Rummy brings you the best of free online rummy gaming with an advanced digital interface that guarantees hours and hours of undiluted entertainment. What’s more! You get a chance to earn real cash rummy rewards with KhelPlay Rummy. <br /> <br /> <span className="strong">Popular Game Formats:</span> <br /> 13 Cards Rummy and 21 Cards Rummy are the two most popular online rummy variants that can be played at KhelPlayrummy.com. KhelPlay Rummy allows you to play popular rummy games online through its mobile app. <br /> <br /> <span className="strong"><a href="/10-cards-rummy-rules">10 Cards Rummy</a></span><br /> 10 Cards Rummy is a fast paced, action packed 10 card variant of Indian Rummy. A 2 player game is played with 1 deck (52+1 Cards), and a game with more than 2 players is played with 2 decks. All the players are dealt with 10 cards, which they have to meld into sequences and sets. 3 types of games can be played in 10 Cards Rummy; Point, Pool &amp; Deals. <br /> <br /> <span className="strong"><a href="/13-cards-rummy">13 Cards Rummy:</a></span><br /> 13 Cards Rummy is a traditional version of Indian Rummy game played between 2 to 6 Players with 2 decks of cards at KhelPlay Rummy. 13 cards each are dealt to every player in a 13 Card Rummy game, 12 of which have to be melded into Sequences and Sets. Apart from 2 Printed Jokers, 13 Card Rummy also makes use of 8 Wildcard Jokers. What makes 13 Card Rummy so popular among Rummy Players is the fact that it is easy to play and can be enjoyed in its different variants – Pool, Deals and Points. <br /> <br /> <span className="strong"><a href="/pool-rummy">Pool Rummy:</a> </span><br /> Pool Rummy consists of two types – 101 and 201. The basic premise of the 101 Pool Rummy Game is that the first Player to reach 101 Points loses, while in the 201 Pool Rummy Game the first Player to reach 201 Points loses. Players continually attempt to meld their cards into Sequences and Sets and reduce their number of points so as to avoid the danger mark. What makes the game more exciting is the provision for Players to Re-Buy the Game after losing, which is applicable when the highest score is less than 79 points in case of 101 Rummy and less than 174 Points in 201 Rummy Game. The facility for the Pot to be Split among Players through Auto Split and Manual Split options is another one of the interesting aspects of 101 and 201 Rummy Game. Manual Split allows 2 or more Players to share the Spoils on a Multiplayer (3 or more) Table while Auto Split gets triggered when 2 or more players have scores of more than 80 and 175 in a 101 Rummy and 201 Rummy Multiplayer Game respectively. <br /> <br /> <span className="strong"><a href="/deal-rummy">Deals Rummy</a>: </span><br /> Deals Rummy is a commonly played rummy variant which consists of a fixed number of Deals. Depending on the number of Deals involved, Deals Rummy Game can be classified into the Best of 6 (BO6) or Best of 3 (BO3) or Best of 2 (BO2) types. In both of these variants, irrespective of the number of rounds won, the one to score minimum points upon completion of either 6 rounds in BO6 or 3 rounds in BO3 or 2 rounds in BO2 is declared winner. And in case of a Tie between 2 or more Players, an extra Tiebreaker Round would be played to decide the Winner. <br /> <br /> <span className="strong"><a href="/point-rummy">Points Rummy</a>: </span><br /> Points Rummy is a popular Rummy Variant which consists of only one deal per game and where the value of points is predetermined. Players get to choose between different Point Games ranging in point value between 0.05 and 125 in this fast-paced and highly entertaining Rummy format. In any Point Game, the winner gets an amount equal to the combined score of all the losing players multiplied by the point value minus the rake*. <br /> <br /> Both 13 Cards Rummy and 21 Cards Rummy can be played in the Points format. <br /> <br /> <span className="strong"><a href="/21-card-rummy">21 Cards Rummy</a>:</span> <br /> 21 Cards Rummy is a popular variant of Indian Rummy game which is commonly played across India and is available in its Desktop Version at KhelPlay Rummy. Played in the Points format with three decks of cards, 21 Cards Rummy requires 3 Pure Sequences to be formed at the minimum for a valid Show. Apart from making use of additional Grouping methodologies such as Doublees and Tunellas, 21 Cards Rummy also employs an extra group of Wildcard Jokers! Tailor-made for those adept at playing lengthier versions of the rummy game, it is more expansive in scope and presents players with a wider range of possibilities, thereby serving as a more robust measure of assessing their Rummy capabilities. <br /> <br /> <span className="strong"><a href="/27cards-rummy">27 Cards Rummy</a>:</span> <br /> Khelplay Rummy exclusively brings before you 27 card Rummy game. 27 Cards Rummy is a 2 to 5 players game played with 3 decks of 53 cards including one printed joker per deck. 27 card rummy is played with only point rummy variant. <br /> <br /> <span className="strong"><a href="/rummy-tournaments">Rummy Tournaments</a>: </span><br /> KhelPlay Rummy Tournaments are played in the 13 Cards Rummy format and may be Round based or Level based. Players can enroll for free or with certain minimum buy-ins to win real Cash Chips and Prizes in Kind. Moreover, we also offer Tickets to Players for joining Specific Tournaments. <br /> <br /> So, what are you waiting for? Register now and start playing real rummy online for free. Get ready to enjoy unlimited fun playing rummy games online with KhelPlay Rummy.</div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>How Easy Is It To Deposit and Withdraw Cash?</h3>
                              </div>
                              <div className="acc_content">We provide you with <a href="/deposit-options">easy deposits options</a> online when you choose to play online rummy with cash. Players can make their deposits using different options on KhelPlayrummy.com website as well as our android app. <br /> <br /> Not only does KhelPlay Rummy provide its players to play free rummy online, all transactions made on the KhelPlay Rummy website are 100% safe and secure. On clicking the Add Cash option on the website, users will be led to the page where payment options such as Net Banking, Credit Card, Paytm Wallet, Cash Cards, Mobile Wallet, etc. can be availed. On the top portion they are required to fill in the Deposit amount with any Bonus Code (if any), following which they need to again click on Add Cash button at the bottom to be directed to the Secure Payment Gateway. Players can rest assured that the information they enter on KhelPlay Rummy website is not shared with any third party, thereby ensuring complete confidentiality of all User data. Playing online rummy card games for real cash was never so easy! <br /> <br /> Withdrawal can be done without any hassle at KhelPlay Rummy with online rummy players being allowed to withdraw anywhere from Rs. 200 to Rs. 10,000 in one go. According to the withdrawal policy, the Withdrawal can be in the form of a direct Account transfer or Cheque Transfer with minimum charges (1st two Withdrawals are free). Please be informed that there is a document verification process that needs to be carried out before withdrawal can be initiated, details of which can be checked under the withdrawal Tab.</div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>Is Rummy Legal to Play in India?</h3>
                              </div>
                              <div className="acc_content"><span className="strong">It is absolutely Legal to play Rummy online in India!</span> <br /> <br /> Yes, it is absolutely legal to play rummy online or rummy offline. As per Supreme Court's decision, it is absolutely legal to play rummy online for free across India (except for the states of Assam, Odisha, Sikkim and Telangana). <br /> <br /> So forget about all that hearsay that deters you from enjoying a good game of online rummy. Register right away and enjoy the benefits, have fun and enjoy a whole new experience with playing online rummy games at KhelPlay Rummy! <br /> <br /> (Users accessing the site from the Indian states of Assam, Odisha, Sikkim and Telangana are not entertained by Khelplayrummy.com for the legal reasons. We do not entertain people from these regions accessing the sites or wagering on the game. Users detected by the system accessing the website from these states or any other region where there is an issue regarding playing real rummy online, their accounts will stand suspended or cancelled.)</div>
                           </div>
                           <div className="accordion_in">
                              <div className="acc_head">
                                 <h3>What Are the Latest Offers and Bonuses at KhelPlay Rummy?</h3>
                              </div>
                              <div className="acc_content"><span className="strong">Welcome Bonus:<br />An Awesome Flat 200% Welcome Bonus on your First Deposit</span><br /> We offer great benefits to the newly joined online rummy players to kick start their rummy journey. When you choose to play real cash rummy and make your first cash deposit, we offer a Flat 200% instant Bonus on your deposit without using any Bonus code.<br /> <br />For example: You deposit Rs. 1,000 and in return, we give you Rs. 2,000 as instant Bonus in your account. Maximum Bonus is Rs. 1 LAKH on 1st Deposit. <br /> <br /> <span className="strong">Refer your Friends and Get upto Rs.2500* &amp; your friend gets 250% bonus*.</span><br />Share your common interest for online rummy by referring your friends. It is a win-win situation for both, as the Referrer gets 5% cash upto Rs.2500 of the Referee's wagering amount, while the referee gets a 250% bonus upto Rs. 2500 on his/her first deposit by using the Code: <span className="strong">REF250</span>.<br /> <br /> <span className="strong">Free Rummy Tournaments:</span><br /> Apart from the above offers, there are numerous rummy tournaments like Rummy Thalaiva tournament, Daily Freeroll tournament, Weekend Freeroll tournament, Entry tournament and Fortune tournament on KhelPlay Rummy. Participation in these rummy tournaments are <span className="strong">totally FREE</span>, and collectively you can win from a <span className="strong">prize pool of more than Rs. 650,000</span>. It's been never so easy to play rummy online for cash &amp; win big rewards. <br /> <br /> See all our cash rummy tournaments <a href="/promotions">here</a>. <br /> <br /> So, what are you waiting for? Play rummy games online at KhelPlay Rummy.</div>
                           </div>
                        </div>
                        <div className="download_apk_btn" id="download_apk_btn_holder"> <a href="https://khelplayrummy.onelink.me/2977213167/51a2b601"><img src="/images/common/Download-App-button.png" alt="Download App" /></a></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section> */}
<section id="sp-mainbody" className="main_body">
   <div className="container">
      <div className="row">
         <div id="sp-component" className="col-sm-12 col-md-12">
            <div className="sp-column ">
               <div id="system-message-container"> </div>
               <div className="blog-featuredhome_page" itemScope itemType="http://schema.org/Blog"> </div>
            </div>
         </div>
      </div>
   </div>
</section>
             </div>
         )
}
}

export default MobileBody;

