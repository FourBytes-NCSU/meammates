import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import homeIconWhite from './../../assets/home_white.png';
import homeIconBlack from './../../assets/home_black.png';
import './GoHome.css';

//component for programmatic navigation
//can be done easily using Link Component
//used history object to represent it's usage
class GoHome extends Component {
    navigateToHome = () => {
        const { history } = this.props;
        // setTimeout(() => {
        //     history.push('/')
        // }, 2000);

        history.push('/')
    }
    render() {
        const { location } = this.props;
        const whiteBtn = location.pathname === '/';
        return (
            <button className={`go-home-btn ${whiteBtn ? 'white-bkg' : 'gradient-bkg'
                }`} onClick={this.navigateToHome}>
                <img
                    className="home-icon"
                    src={whiteBtn ? homeIconBlack : homeIconWhite}
                    alt="home-icon"
                />
            </button>
        );
    }
}

export default withRouter(GoHome);