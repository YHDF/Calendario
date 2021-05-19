import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,

} from "react-router-dom";

import Navbar from './javascripts/components/Navbar'
import Home from './javascripts/pages/Home'
import Connect from './javascripts/pages/Connect'
import CompaniesList from './javascripts/pages/CompaniesList'
import Calendar from './javascripts/pages/Calendar'

class App extends React.Component {

    componentDidMount() {

    }



    render() {
        return (
            <Router>

                <Switch>
                    <Route path="/calendar" render={(props) => <Calendar {...props}/>}/>
                    <Route path="/auth/connect">
                        <Navbar />
                        <Connect />
                    </Route>
                    <Route path="/admin/companieslist">
                        <Navbar />
                        <CompaniesList />
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <Home />
                    </Route>

                </Switch>
            </Router>
        );

    }
}

export default App;