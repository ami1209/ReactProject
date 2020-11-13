import '../../css/home.css';
import '../../css/header.css';
import '../../css/footer.css';

import Header from '../HomePage/Header';
import Body from '../HomePage/Body';
import Footer from '../HomePage/Footer';
import PostLogin from '../HomePage/PostLogin';

import React from 'react';

class DesktopPage extends React.Component{
    render(){
        return(
            <div>
              <Header/>
              <Body/>
              <Footer/>
            </div>
        )
    }
}

export default DesktopPage;