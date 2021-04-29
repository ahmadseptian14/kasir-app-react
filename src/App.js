import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import history from './history';
import {Home, Success, Signup, Login} from './pages'

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <main>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/success" component={Success} exact/>
                        <Route path="/signup" component={Signup} exact/>
                        <Route path="/login" component={Login} exact/>
                        <Route path="/logout" component={Login} exact/>
                    </Switch>
                </main>
            </Router>
        )
    }
}
