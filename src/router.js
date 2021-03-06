import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Login from './pages/login';
import NoMatch from './pages/nomatch';
import Admin from './admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notices from './pages/ui/notice';
import Messages from './pages/ui/messages';
import MyTabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import BasicForm from './pages/form/login';
import RegisterForm from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail';
export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() =>
                            <Common>
                                <Switch>
                                    <Route path='/common/order/detail/:id' component={OrderDetail} />
                                </Switch>
                            </Common>
                        }
                        />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notices} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={MyTabs} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousels} />
                                    <Route path="/form/login" component={BasicForm} />
                                    <Route path="/form/reg" component={RegisterForm} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter >
        );
    }
}