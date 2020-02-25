import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'unistore/react';
import { store } from '../stores/store';

import Error404 from '../pages/error404Pages';
import HomePage from '../pages/homePage'
        
const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/404' component={Error404} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}
export default MainRoute;
