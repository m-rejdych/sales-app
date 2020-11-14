import React from 'react';
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const Auth: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AuthForm isLoggingIn={pathname === '/login'} />
    </Box>
  );
};

export default Auth;
