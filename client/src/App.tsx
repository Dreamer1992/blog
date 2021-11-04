import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {routes} from './routes';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Alert from "./components/Notification/Alert/Alert";

const App = () => {
    return (
        <React.Fragment>
            <Router>
                <Alert/>
                <Header/>

                <main className="main">
                    <Switch>
                        {
                            routes.map(({path, Component}) =>
                                <Route key={path} exact path={path} component={Component}/>)
                        }
                    </Switch>
                </main>

                <Footer/>
            </Router>
        </React.Fragment>
    );
};

export default App;
