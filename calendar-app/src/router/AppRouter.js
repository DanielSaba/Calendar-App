import React from 'react'
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRoute';

export const AppRouter=()=>{

    const dispatch=useDispatch();

    const {checking, uid}=useSelector(state=>state.auth);

   useEffect(()=>{
      dispatch(startChecking());
    },[dispatch]);

   if(checking){
       return(<h5>Esperee...</h5>);
   }

    return(
        <Router>
            <Switch>
                <PublicRouter
                    exact 
                    path="/LoginScreen" 
                    component={LoginScreen}
                    isAuthenticated={!!uid}
                    
                    />
                <PrivateRouter
                    exact 
                    path="/" 
                    component={CalendarScreen}
                    isAuthenticated={!!uid}
                    />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}