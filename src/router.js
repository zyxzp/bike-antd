import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Login from './pages/login';
import NoMatch from './pages/nomatch';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Home from './pages/home';

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}