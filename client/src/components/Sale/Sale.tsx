import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Product from '../Product';
import AddProductForm from '../AddProductForm';
import EditSalePopover from '../EditSalePopover';
import {
  useGetUserQuery,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  useGetProductsQuery,
  Sale as SaleType,
} from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.primary.main}`,
    maxWidth: '30vw',
    margin: theme.spacing(2),
    cursor: 'pointer',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogMinWidth: {
    minWidth: 500,
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

interface InitialValues {
  name: string;
  description: string;
  price: number;
}

interface Props {
  id: string;
  subject: string;
  user: User;
}

const Sale: React.FC<Props> = ({
  id,
  subject,
  user: { fullName, id: userId },
}) => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductId, setEditedProductId] = useState<string | null>(null);
  const [
    productInitialValues,
    setProductInitialValues,
  ] = useState<InitialValues | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data, loading } = useGetUserQuery();
  const { data: productsData } = useGetProductsQuery({
    variables: { saleId: id },
  });
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
    setTimeout(() => {
      setIsAddingProduct(false);
    }, 500);
    setOpen((o) => !o);
  };

  const handleOpenPopover = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAnchorEl(e.currentTarget);
    setPopoverOpen(true);
  };

  const handleClosePopover = (): void => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  const handleUpdateSale = async (value: string): Promise<void> => {
    await updateSale({ variables: { data: { saleId: id, subject: value } } });
  };

  const handleDeleteSale = async (): Promise<void> => {
    await deleteSale({ variables: { saleId: id } });
  };

  const handleCancel = (): void => {
    setIsAddingProduct(false);
    setIsEditing(false);
    setEditedProductId(null);
    setProductInitialValues(null);
  };

  return (
    <>
      <Card elevation={3} className={classes.card} onClick={toggleDialog}>
        <CardHeader title={`${subject} sale`} subheader={fullName} />
        <CardActions onClick={(e) => e.stopPropagation()}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={24} color="primary" />
            </Box>
          ) : (
            data?.getUser.id === userId && (
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
                <EditSalePopover
                  handleClose={handleClosePopover}
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  handleUpdateSale={handleUpdateSale}
                />
              </>
            )
          )}
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={toggleDialog}
        maxWidth="lg"
        classes={{ paperScrollPaper: classes.dialogMinWidth }}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h4">{`${subject} sale`}</Typography>
          <IconButton onClick={toggleDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isAddingProduct || isEditing ? (
            <AddProductForm
              saleId={id}
              cancelAdding={handleCancel}
              isEditing={isEditing}
              productInitialValues={productInitialValues}
              editedProductId={editedProductId}
            />
          ) : (
            productsData?.getProducts.map((product) => (
              <Product
                key={product.id}
                isOwner={data?.getUser.id === userId}
                setIsEditing={setIsEditing}
                setProductInitialValues={setProductInitialValues}
                setEditedProductId={setEditedProductId}
                {...product}
              />
            ))
          )}
        </DialogContent>
        {data?.getUser.id === userId && !isAddingProduct && !isEditing && (
          <DialogActions>
            <Button
              onClick={(): void => setIsAddingProduct(true)}
              variant="contained"
              color="primary"
            >
              Add product
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Sale;
