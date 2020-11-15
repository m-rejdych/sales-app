import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDeriverStateFromError(error: Error) {
    return { error: true };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    return error ? (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" color="textSecondary">
          Something went wrong :(((
        </Typography>
      </Box>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
