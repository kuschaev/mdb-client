// Core
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// Components
import ListView from './components/ListView';
import EntityView from './components/EntityView';
import Header from './components/Header';
import Footer from './components/Footer';
// Instruments
import './App.css';

function App() {
    return (
        // TODO: 1)router 2)movie_view 3)error_catcher 4)filter_shape 5)useFilter maybe
        <>
            <Router>
                <Header />
                <Switch>
                    <Route path={'/list'} component={ListView} />
                    <Route path={'/:type/:id'} component={EntityView} />
                    <Redirect to={'/list'} />
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
