import '../../css/home.css';
import '../../css/header.css';
import '../../css/footer.css';

import Header from '../HomePage/Header';
import Body from '../HomePage/Body';
import Footer from '../HomePage/Footer';

import React from 'react';

class PostLogin extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <div>
                    <p>Post Login React</p>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default PostLogin;