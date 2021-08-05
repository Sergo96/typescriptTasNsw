import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Route, Switch } from 'react-router-dom';
import styled from "styled-components";
import GetMovies from "./Components/GetMovies";
import MovieForm from "./Components/MovieForm";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8c8c8d'
        }
    }
})


const errorLink = onError(({ graphqlErrors, networkError }: any) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }: any) => {
            alert(`Graphql error ${message}`);
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:3005/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

const App: React.FC<{}> = () => {
    return (
        <>
            <ApolloProvider client={client}>
                <Switch>
                    <ThemeProvider theme={theme}>
                        <div className="app">
                            <GetMovieContainer>
                                <Route exact path='/' component={GetMovies} />
                                <Route exact path='/createMovie' component={MovieForm} />
                                <Route exact path={'/editMovieForm/:id'} component={MovieForm} />
                            </GetMovieContainer>
                        </div>
                    </ThemeProvider>
                </Switch>
            </ApolloProvider>
        </>
    );
}

export default App;

const GetMovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
`;