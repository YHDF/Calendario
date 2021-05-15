import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,

} from "react-router-dom";

import Navbar from './javascripts/components/Navbar'
import Home from './javascripts/pages/Home'
import Connect from './javascripts/pages/Connect'

class App extends React.Component {



    componentDidMount() {

    }



    render() {
        console.log(this.state)
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/auth/connect">
                        <Connect />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );

    }
}

export default App;