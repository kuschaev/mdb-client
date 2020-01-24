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
import ItemView from './components/ItemView';
import Header from './components/Header';
import Footer from './components/Footer';
// Instruments
import './App.css';
import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        // TODO: 1)remember_prev_route_state 2)movie_view 3)error_catcher 4)filter_shape 5)useFilter
        <>
            <Router>
                <FlexContainer>
                    <Header />
                    <Switch>
                        <Route path={'/list'} component={ListView} />
                        <Route path={'/:type/:id'} component={ItemView} />
                        <Redirect to={'/list'} />
                    </Switch>
                    <Footer />
                </FlexContainer>
            </Router>
        </>
    );
}

export default App;
