import '../../css/home-combined-mobile.css';
import '../../css/footer-m.css';

import Header from '../HomePage/Header';
import MobileBody from '../HomePage/MobileBody';
import Footer from '../HomePage/Footer';

import React from 'react';

class MobilePage extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <MobileBody/>
                <Footer/>
            </div>
        )
    }
}

export default MobilePage;
