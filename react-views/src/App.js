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
import Login from './javascripts/pages/Login'
import Join from './javascripts/pages/Join'
import CompanyRegistration from './javascripts/pages/CompanyRegistration'



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { authenticated: document.cookie.length !== 0 };
        this.getAuthSatus = this.getAuthSatus.bind(this);
        this.setSessionId = this.setSessionId.bind(this);
        this.getSessionId = this.getSessionId.bind(this);
    }
    componentDidMount() {
    }

    getSessionId() {
        return document.cookie
    }
    setSessionId(session_id) {
        document.cookie = `session_id=${session_id}`;
    }

    getAuthSatus() {
        this.setState({ authenticated: document.cookie.split('; ').find(row => row.startsWith('session_id=')) !== undefined })
        console.log(document.cookie)

    }



    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/admin/registercompany">
                    <CompanyRegistration authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} />
                    </Route>
                    <Route path="/admin/calendar" render={(props) => <Calendar {...props} authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} />} />
                    <Route path="/auth/login">
                        <Navbar />
                        <Login authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} setSessionId={this.setSessionId} />
                    </Route>
                    <Route path="/auth/join">
                        <Navbar />
                        <Join authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} setSessionId={this.setSessionId} />
                    </Route>
                    <Route path="/auth/connect">
                        <Navbar />
                        <Connect authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} setSessionId={this.setSessionId} />
                    </Route>
                    <Route path="/admin/companieslist">
                        <Navbar />
                        <CompaniesList authenticated={this.state.authenticated} getAuthSatus={this.getAuthSatus} />
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <Home />
                    </Route>

                </Switch>
            </Router>
        )

        /*else if (this.state.pathname === '/') {
            console.log('this')
            return (
                <Router>
                    <Switch>
                        <Route path="/">
                            <Navbar />
                            <Home authenticated={this.state.authenticated} />
                        </Route>
                        <Route path="/auth/connect">
                            <Navbar />
                            <Connect authenticated={this.state.authenticated} />
                        </Route>
                    </Switch>
                </Router>

            )
        }*/
        /*else {
            return (
                <Router>
                    <Redirect to='/auth/connect' />
                    <Switch>
                        <Route path="/auth/connect">
                            <Navbar />
                            <Connect authenticated={this.state.authenticated} />
                        </Route>
                        <Route path="/">
                            <Navbar />
                            <Home authenticated={this.state.authenticated} />
                        </Route>
                    </Switch>
                </Router>
            )
        }*/


    }
}

export default App;