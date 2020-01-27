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
                        <Route path={'/discover/movie'} component={ListView} />
                        <Route path={'/discover/tv'} component={ListView} />
                        <Route path={'/movie/popular'} component={ListView} />
                        <Route path={'/movie/top_rated'} component={ListView} />
                        <Route path={'/movie/now_playing'} component={ListView} />
                        <Route path={'/movie/upcoming'} component={ListView} />
                        <Route path={'/movie/:id'} component={ItemView} />
                        <Route path={'/tv/popular'} component={ListView} />
                        <Route path={'/tv/top_rated'} component={ListView} />
                        <Route path={'/tv/on_the_air'} component={ListView} />
                        <Route path={'/tv/airing_today'} component={ListView} />
                        <Route path={'/tv/:id'} component={ItemView} />
                        <Redirect to={'/discover/movie'}  />
                    </Switch>
                    <Footer />
                </FlexContainer>
            </Router>
        </>
    );
}

export default App;
