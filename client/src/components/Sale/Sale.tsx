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
  CircularProgress,
  Box,
  TextField,
  Popover,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Product from '../Product';
import {
  useGetUserQuery,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  Sale as SaleType,
} from '../../generated/graphql';

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
  errorColor: {
    backgroundColor: theme.palette.error.main,
  },
  overflowXVisible: {
    overflowX: 'visible',
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

const Sale: React.FC<Props> = ({
  id,
  subject,
  user: { fullName, id: userId },
  products,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data, loading } = useGetUserQuery();
  const [updateSale] = useUpdateSaleMutation();
  const [deleteSale] = useDeleteSaleMutation({
    update(cache, { data: { deleteSale } }: any) {
      cache.modify({
        fields: {
          getAllSales(sales = [], { readField }) {
            return sales.filter(
              (sale: SaleType) => deleteSale !== readField('id', sale),
            );
          },
        },
      });
    },
  });
  const classes = useStyles();

  const toggleDialog = (): void => {
    setOpen((o) => !o);
  };

  const handleOpenPopover = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAnchorEl(e.currentTarget);
    setPopoverOpen(true);
  };

  const handleClosePopover = (): void => {
    setValue('');
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(e.target.value);
  };

  const handleUpdateSale = async (): Promise<void> => {
    await updateSale({ variables: { data: { saleId: id, subject: value } } });
    setValue('');
  };

  const handleDeleteSale = async (): Promise<void> => {
    const result = await deleteSale({ variables: { saleId: id } });
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
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : data?.getUser.id === userId ? (
          <>
            <Button
              onClick={handleOpenPopover}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              className={classes.errorColor}
              onClick={handleDeleteSale}
            >
              Delete
            </Button>
            <Popover
              anchorEl={anchorEl}
              open={popoverOpen}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              classes={{ paper: classes.overflowXVisible }}
            >
              <TextField
                label="Subject"
                variant="outlined"
                color="primary"
                value={value}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleUpdateSale} color="primary">
                      Update
                    </Button>
                  ),
                }}
              />
            </Popover>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={toggleDialog}>
            View
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Sale;
