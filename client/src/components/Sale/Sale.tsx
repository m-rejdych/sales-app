import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Product from '../Product';

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.primary.main}`,
    maxWidth: '30vw',
    margin: theme.spacing(3),
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface User {
  id: string;
  fullName: string;
}

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Props {
  id: string;
  subject: string;
  user: User;
  products: ProductType[];
}

const Sale: React.FC<Props> = ({ subject, user: { fullName }, products }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleDialog = (): void => {
    setOpen((o) => !o);
  };

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader title={`${subject} sale`} subheader={fullName} />
      <CardContent>
        <Dialog open={open} onClose={toggleDialog} maxWidth="lg">
          <DialogTitle disableTypography className={classes.dialogTitle}>
            <Typography variant="h4">{`${subject} sale`}</Typography>
            <IconButton onClick={toggleDialog}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={toggleDialog}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default Sale;
