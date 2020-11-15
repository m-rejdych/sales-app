import React, { Dispatch, SetStateAction } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import {
  useDeleteProductMutation,
  Product as ProductType,
} from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.secondary.main}`,
    margin: theme.spacing(2),
  },
}));

interface InitialValues {
  name: string;
  description: string;
  price: number;
}

interface Props extends InitialValues {
  id: string;
  isOwner: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setProductInitialValues: Dispatch<SetStateAction<InitialValues | null>>;
  setEditedProductId: Dispatch<SetStateAction<string | null>>;
}

const Product: React.FC<Props> = ({
  id,
  name,
  description,
  price,
  isOwner,
  setIsEditing,
  setProductInitialValues,
  setEditedProductId,
}) => {
  const classes = useStyles();
  const [deleteProduct] = useDeleteProductMutation({
    update(cache, { data: { deleteProduct } }: any) {
      cache.modify({
        fields: {
          getProducts(products = [], { readField }) {
            return products.filter(
              (product: ProductType) =>
                readField('id', product) !== deleteProduct,
            );
          },
        },
      });
    },
  });

  const handleDelete = (): void => {
    deleteProduct({ variables: { productId: id } });
  };

  const handleStartEditing = (): void => {
    setProductInitialValues({ name, description, price });
    setEditedProductId(id);
    setIsEditing(true);
  };

  return (
    <Card elevation={2} className={classes.card}>
      <CardHeader
        title={name}
        action={
          isOwner ? (
            <Box display="flex">
              <IconButton onClick={handleStartEditing}>
                <Edit color="primary" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <Delete color="error" />
              </IconButton>
            </Box>
          ) : null
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography>{description}</Typography>
          <Typography>$ {price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;
