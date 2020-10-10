// Core
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// Components
import DiscoverView from './containers/DiscoverView';
import SearchView from './containers/SearchView';
import ListView from './containers/ListView';
import ItemView from './containers/ItemView';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
// Instruments
import './App.css';
import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        // TODO: 1)pagination&queryStr 2)movie_view 3)error_catcher 4)filter_shape 5)useFilter
        <>
            <Router basename='/mdb-client'>
                <FlexContainer>
                    <ErrorBoundary>
                        <Header />
                        <Switch>
                            <Route
                                path={'/discover/:type'}
                                component={DiscoverView}
                            />
                            <Route
                                path={'/list/:type/:listType'}
                                component={ListView}
                            />
                            <Route
                                path={'/title/:type/:id'}
                                component={ItemView}
                            />
                            <Route
                                path={'/search/:type'}
                                component={SearchView}
                            />
                            <Redirect to={'/discover/movie'} />
                        </Switch>
                        <Footer />
                    </ErrorBoundary>
                </FlexContainer>
            </Router>
        </>
    );
}

export default App;
