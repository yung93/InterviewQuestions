import React from 'react';
import routes from '../routes';
import { Route, Switch } from 'react-router-dom';
import {Header} from "../components/organisms";
import styled from "@emotion/styled";

const Container = styled('div')(
    {
        width: '80%',
        maxWidth: '1140px',
        margin: 'auto',
        paddingTop: '100px',
        position: 'relative',
    }
);

const DefaultLayout = () => {
  return (
      <div>
        <Header/>
        <Container>
            <Switch>
              {
                routes.map((route, index) => {
                  return <Route
                            key={`route_${route.name}_${index}`}
                            path={route.path}
                            exact={route.exact}
                            render={props => (
                                <route.component {...props} />
                            )} />
                })
              }
            </Switch>
        </Container>
      </div>
  )
};

export default DefaultLayout;