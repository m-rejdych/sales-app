import React from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import { gql } from '@apollo/client';

import InputElement from '../InputElement';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
}));

interface Values {
  name: string;
  description: string;
  price: number;
}

interface Props {
  saleId: string;
  cancelAdding: () => void;
  isEditing?: boolean;
  editedProductId?: string | null;
  productInitialValues?: Values | null;
}

const AddProductForm: React.FC<Props> = ({
  saleId,
  cancelAdding,
  isEditing,
  productInitialValues,
  editedProductId,
}) => {
  const classes = useStyles();
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation({
    update(cache, { data: { addProduct } }: any) {
      cache.modify({
        fields: {
          getProducts() {
            const newProducts = cache.writeQuery({
              data: addProduct,
              variables: { saleId },
              query: gql`
                query GetProducts($saleId: ID) {
                  getProducts(saleId: $saleId) {
                    id
                    name
                    description
                    price
                  }
                }
              `,
            });
            return newProducts;
          },
        },
      });
    },
  });

  const handleCancel = (handleReset: () => void): void => {
    handleReset();
    cancelAdding();
  };

  const handleAddProduct = async (values: Values): Promise<void> => {
    const { price, ...rest } = values;
    await addProduct({
      variables: { data: { ...rest, saleId, price: Number(price) } },
    });
    cancelAdding();
  };

  const handleUpdateProduct = async (values: Values): Promise<void> => {
    const { price, ...rest } = values;
    await updateProduct({
      variables: {
        data: {
          ...rest,
          price: Number(price),
          productId: editedProductId as string,
        },
      },
    });
    cancelAdding();
  };

  const initialValues = productInitialValues || {
    name: '',
    description: '',
    price: 0,
  };

  const fields = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.trim().length === 0) errorMessage = 'Name can not be empty!';
        return errorMessage;
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.trim().length === 0)
          errorMessage = 'Description can not be empty!';
        return errorMessage;
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!Number(value)) errorMessage = 'Price must be a number!';
        return errorMessage;
      },
    },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ handleReset, values, isValid, dirty }) => (
        <Box display="flex" flexDirection="column">
          {fields.map((field) => (
            <InputElement key={field.name} {...field} />
          ))}
          <Box className={classes.alignSelfEnd}>
            <Button onClick={() => handleCancel(handleReset)}>Cancel</Button>
            <Button
              disabled={!(isValid && dirty)}
              onClick={() =>
                isEditing
                  ? handleUpdateProduct(values)
                  : handleAddProduct(values)
              }
              variant="contained"
              color="primary"
            >
              {isEditing ? 'Edit' : 'Add'}
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default AddProductForm;
