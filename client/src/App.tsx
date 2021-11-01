import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {routes} from './routes';

const App = () => {
    return (
        <div className="container">
            <Router>
                <Switch>
                    {
                        routes.map(({path, Component}) =>
                            <Route key={path} exact path={path} component={Component}/>)
                    }
                </Switch>
            </Router>
        </div>
    );
};

export default App;
