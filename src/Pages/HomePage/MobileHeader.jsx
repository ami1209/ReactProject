import React, {Component} from 'react';
import Slider from "react-slick";
// import '../../css/flexslider.css';
import '../../css/home-combined-mobile.css';
// import '../../css/bootstrap.min.css';
import logo from '../../images/logo-diwali.gif';
import LazyLoad from 'react-lazy-load';
import FbLogin from '../../images/home/facebook_login_btn.png';
// import ScriptTag from 'react-script-tag';
// import jQuery from '../../templates/js/jquery-1.11.3.js';
// import placeHolder from '../../templates/js/placeholder.js';
// import Accordion from '../../templates/js/smk-accordion.js';
// import JQueryScroll from '../../templates/js/jquery.scrollbar.js';
// import Isotope from '../../templates/js/isotope.pkgd.min.js';
// import Custome from '../../templates/js/custome.js';
// import jQuery from 'jquery';

const Modal = ({ handleClose, show, children }) => {
   const showHideClassName = show ? "modal display-block" : "modal display-none";
 
   return (
     <div className={showHideClassName}>
       <section className="modal-main">
         {children}
         <button onClick={handleClose}>close</button>
       </section>
     </div>
   );
 };

class MobileBody extends Component{

   constructor(props){
      super(props);
      this.state = {
         show: false
      };
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
   }

   
   showModal = () => {
      debugger;
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };

   toggleMenu(){
      this.setState({menu : !this.state.menu})
   }

   

render(){
const show = (this.state.menu) ? "show" : "";

return(
<div>
   <header id="sp-header">
      <div className="container">
         <div className="row">
            <div id="sp-logo" className="col-sm-2 col-md-2">
               <LazyLoad>
               <div className="sp-column logo"><a className="logo" href="/"><img className="sp-default-logo" src={logo} alt="Khelplayrummy"/></a></div>
               </LazyLoad>
            </div>
            <div id="sp-top1" className="col-sm-2 col-md-2">
               <div className="sp-column mob_notify_menu">
                  <div className="sp-module ">
                     <div className="sp-module-content"> 
                     <script>var $=jQuery.noConflict();</script>
                        <div className="custom" >
                           <ul>
                              <li className="last"><a onClick={this.toggleMenu} className="mobile_menubar"><i className="fa fa-bars"></i></a></li>
                           </ul>
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
                              <li><a href="#" onClick={this.showModal}  data-toggle="modal" data-target="#home_register"><i className="fa fa-user"></i> Register Now</a></li>
                              <Modal show={this.state.show} handleClose={this.hideModal}>
                              <p>Modal</p>
                              <p>Data</p>
                           </Modal>
                              <li className="middle"><a href="#" data-toggle="modal" onClick={e => e.preventDefault()}  data-target="#home_login"><i className="fa fa-lock"></i> Login</a></li>
                              <li className="mobile_menubar" style={{display: "none"}}><a menu-toggler="true" className="mobile_menubar"><i className="fa fa-bars"></i></a></li>
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
                           <div className="facebook_login">
                              <a onClick="openInPopuop('/component/weaver/?task=facebook.facebooklogin&amp;logtype=login_widget');" onMouseOver="" style={{cursor: "pointer"}}><img src={FbLogin} alt="facebook login" /></a> 
                              <p>By logging, you agree to our <a href="/terms">T&amp;C</a></p>
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
                        <script>var $=jQuery.noConflict();</script> 
                     </div>
                  </div>
               </div>
            </div>
            </div>
</div>
</header>


</div>
)
}
}
export default MobileBody;