import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {routes} from './routes';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Alert} from "./components/Notification/Alert/Alert";

import {refreshToken} from './redux/actions/authAction'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Router>
                <Alert/>
                <Header/>

                <main className="main">
                    <Switch>
                        {
                            routes.map(({path, Component, exact}) =>
                                <Route key={path} exact={exact} path={path} component={Component}/>)
                        }
                    </Switch>
                </main>

                <Footer/>
            </Router>
        </React.Fragment>
    );
};

export default App;
