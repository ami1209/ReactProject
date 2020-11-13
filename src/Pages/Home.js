// import Header from '../Pages/HomePage/Header';
// import Body from '../Pages/HomePage/Body';
// import Footer from '../Pages/HomePage/Footer';
// import MobileHeader from '../Pages/HomePage/MobileHeader';
// import MobileBody from '../Pages/HomePage/MobileBody';
// import MobileFooter from '../Pages/HomePage/MobileFooter';


import DesktopPage from '../Pages/HomePage/DesktopPage';
import MobilePage from '../Pages/HomePage/MobilePage';
import React from 'react';

import '../css/template.css';
import '../css/bootstrap.min.css';

import { useMediaQuery } from 'react-responsive'
 
const Desktop = ({ children }) => {
   const isDesktop = useMediaQuery({ minWidth: 992 })
   return isDesktop ? children : null
 }
 const Tablet = ({ children }) => {
   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
   return isTablet ? children : null
 }
 const Mobile = ({ children }) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   return isMobile ? children : null
 }

// const UIBreakpoints = {
//    mobile: 0,
//    phablet: 550,
//    tablet: 768,
//    desktop: 992,
//  };

class Home extends React.Component{
   render(){
      return(
         <div>

        <Mobile>
           <MobilePage></MobilePage>
        </Mobile>

        <Desktop>
           <DesktopPage></DesktopPage>
        </Desktop>
        
        <Tablet>
           <MobilePage></MobilePage>
        </Tablet>

        
       
         </div>
      )
   }
}

export default Home;