import React from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';

import InputElement from '../InputElement';

const useStyles = makeStyles((theme) => ({
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
}));

interface Props {
  saleId: string;
  cancelAdding: () => void;
}

const AddProductForm: React.FC<Props> = ({ saleId, cancelAdding }) => {
  const classes = useStyles();

  const handleCancel = (handleReset: () => void): void => {
    handleReset();
    cancelAdding();
  };

  const initialValues = {
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
      {({ handleReset }) => (
        <Box display="flex" flexDirection="column">
          {fields.map((field) => (
            <InputElement key={field.name} {...field} />
          ))}
          <Box className={classes.alignSelfEnd}>
            <Button onClick={() => handleCancel(handleReset)}>Cancel</Button>
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default AddProductForm;
