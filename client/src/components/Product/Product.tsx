import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.secondary.main}`,
    margin: theme.spacing(2),
  },
}));

interface Props {
  id: string;
  name: string;
  description: string;
  price: number;
}

const Product: React.FC<Props> = ({ name, description, price }) => {
  const classes = useStyles();

  return (
    <Card elevation={2} className={classes.card}>
      <CardHeader title={name} />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography>{description}</Typography>
          <Typography>{price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;
