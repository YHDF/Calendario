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
import AdminCalendar from './javascripts/pages/AdminCalendar'
import Login from './javascripts/pages/Login'
import Join from './javascripts/pages/Join'
import CompanyRegistration from './javascripts/pages/CompanyRegistration'
import ClientCalendar from './javascripts/pages/ClientCalendar'





class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adminAuthenticated: document.cookie.split('; ').find(row => row.startsWith('session_id=')) !== undefined,
            clientAuthenticated: document.cookie.split('; ').find(row => row.startsWith('client_session_id=')) !== undefined,
        };
        this.getAdminAuthStatus = this.getAdminAuthStatus.bind(this);
        this.setAdminSessionId = this.setAdminSessionId.bind(this);
        this.getClientAuthStatus = this.getClientAuthStatus.bind(this);
        this.setClientSessionId = this.setClientSessionId.bind(this);

    }
    componentDidMount() {
        console.log(document.cookie);

    }
    setAdminSessionId(session_id) {
        document.cookie = `session_id=${session_id}`;
    }
    setClientSessionId(session_id) {
        document.cookie = `client_session_id=${session_id}`;
    }
    getAdminAuthStatus() {
        this.setState({ adminAuthenticated: document.cookie.split('; ').find(row => row.startsWith('session_id=')) !== undefined })
    }
    async getClientAuthStatus() {
        this.setState({ clientAuthenticated: document.cookie.split('; ').find(row => row.startsWith('client_session_id=')) !== undefined },
            () => {
                console.log(this.state.clientAuthenticated, 'clientAuthenticated');
            })



    }



    render() {
        return (
            <Router>
                <Switch>

                    <Route path="/client/calendar" render={(props) => <ClientCalendar {...props} clientAuthenticated={this.state.clientAuthenticated} getClientAuthStatus={this.getClientAuthStatus} />} />
                    <Route path="/client/registercompany" render={(props) => <CompanyRegistration {...props} clientAuthenticated={this.state.clientAuthenticated} getClientAuthStatus={this.getClientAuthStatus} />} />
                    <Route path="/admin/calendar" render={(props) => <AdminCalendar {...props} adminAuthenticated={this.state.adminAuthenticated} getAdminAuthStatus={this.getAdminAuthStatus} />} />
                    <Route path="/auth/login">
                        <Login clientAuthenticated={this.state.clientAuthenticated} getClientAuthStatus={this.getClientAuthStatus} setClientSessionId={this.setClientSessionId} />
                    </Route>

                    <Route path="/auth/join">
                        <Join clientAuthenticated={this.state.clientAuthenticated} getClientAuthStatus={this.getClientAuthStatus} setClientSessionId={this.setClientSessionId} />
                    </Route>
                    <Route path="/auth/connect">
                        <Connect adminAuthenticated={this.state.adminAuthenticated} getAdminAuthStatus={this.getAdminAuthStatus} setAdminSessionId={this.setAdminSessionId} />
                    </Route>
                    <Route path="/admin/companieslist">
                        <Navbar adminAuthenticated={this.state.adminAuthenticated} getAdminAuthStatus={this.getAdminAuthStatus} />
                        <CompaniesList adminAuthenticated={this.state.adminAuthenticated} getAdminAuthStatus={this.getAdminAuthStatus} />
                    </Route>
                    <Route path="/">
                        <Navbar adminAuthenticated={this.state.adminAuthenticated} getAdminAuthStatus={this.getAdminAuthStatus} />
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
                            <Home adminAuthenticated={this.state.adminAuthenticated} />
                        </Route>
                        <Route path="/auth/connect">
                            <Navbar />
                            <Connect adminAuthenticated={this.state.adminAuthenticated} />
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
                            <Connect adminAuthenticated={this.state.adminAuthenticated} />
                        </Route>
                        <Route path="/">
                            <Navbar />
                            <Home adminAuthenticated={this.state.adminAuthenticated} />
                        </Route>
                    </Switch>
                </Router>
            )
        }*/


    }
}

export default App;