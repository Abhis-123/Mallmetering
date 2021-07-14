import React, { Component } from 'react'
import { Redirect } from 'react-router';
import GlobalContext from '../state/GlobalContext'

class Setup extends Component {
    static contextType = GlobalContext;


    redirect(){
        const action= this.context
        
        if (action('get',{key:"isLoggedIn"})) {
            return(
                <Redirect to="/home" />
            );
        }
        return <Redirect to="/login" />
    }



    render() {
        const action= this.context        
        if (action('get',{key:"isLoggedIn"})) {
            
            return(
                <Redirect to="/home" />
            );
        }
        return <Redirect to="/login" />
    }
}

export default Setup
