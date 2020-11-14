import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

import { useGetAllSalesQuery } from '../../generated/graphql';

const Home: React.FC = () => {
  const { loading, data } = useGetAllSalesQuery();
  console.log(data);
  return <Box height="100%" padding={4} display="flex"></Box>;
};

export default Home;
