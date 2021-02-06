import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { initializeApp } from './redux/app-reducer';

import Header from './components/header/entry-point';
import Footer from './components/footer/entry-point';

import Index from './components/index/entry-point';
import Double from './components/double/entry-point';
import ProvablyFair from './components/provably-fair/entry-point';
import ModalWindow from './components/modal-window/entry-point';
import Notification from './components/notification/entry-point';
import Account from './components/account/entry-point';


let style = {
    backgroundImage: `linear-gradient(to bottom, rgb(32 42 49 / 80%), rgb(32 42 49 / 80%)), url(${require('./img/bg.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
}

class App extends React.Component {

    componentDidMount(){
        this.props.initializeApp();
    }

    render() {
        return (this.props.initialized) ?
            <div id="wrapper">
                <div style={style}>
                </div>

                <Header user_data=''/>

                <div id="main">
                    <Route exact path={'/'} render={ () => <Index/> } />
                    <Route exact path={'/modal/:name?'} render={ () => <Index/> } />
                    <Route path={'/case/:casename?'} render={ () => <Index/> }/>
                    <Route path={'/double'} render={ () => <Double/> } />
                    <Route path={'/provably-fair'} render={ () => <ProvablyFair/> }/>
                    <Route path={'/account'} render={ () => <Account/> }/>
                </div>

                <ModalWindow/>
                <Notification/>
                <Footer/>
            </div>
            :
            'Loading'
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);