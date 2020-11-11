import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  {
    getUser(id: "02c6fcb8-18c7-4960-b125-91c8d846ae85") {
      email
      fullName
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery(GET_USER);

  console.log(loading, data, error);

  const renderContent = () => {
    if (error) return <Typography>Error occured</Typography>;
    if (loading) return <Typography>Loading...</Typography>;
    return <Typography>{data.getUser.email}</Typography>;
  };

  return <Box minHeight="100vh">{renderContent()}</Box>;
}

export default App;
