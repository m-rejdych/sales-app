import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

import Auth from './pages/Auth';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { useGetUserQuery } from './generated/graphql';

const App: React.FC = () => {
  const { loading, data } = useGetUserQuery();

  useEffect(() => {
    const expiresIn = localStorage.getItem('expiresIn');
    if (Number(expiresIn) - Date.now() < 0) {
      localStorage.clear();
    }
  }, []);

  const renderRoutes = (): JSX.Element => {
    if (loading) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress size={300} color="primary" />
        </Box>
      );
    }

    if (data?.getUser.id) {
      return (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/register" component={Auth} />
        <Route path="/login" component={Auth} />
        <Redirect to="/register" />
      </Switch>
    );
  };

  return (
    <ErrorBoundary>
      <Box minHeight="100vh">{renderRoutes()}</Box>
    </ErrorBoundary>
  );
};

export default App;
