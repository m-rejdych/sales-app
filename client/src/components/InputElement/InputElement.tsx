import React from 'react';
import { useField } from 'formik';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    minHeight: 78,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}));

interface Props {
  name: string;
  type: string;
  validate: (value: string) => string | undefined;
  label: string;
}

const InputElement: React.FC<Props> = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      {...field}
      helperText={touched && error ? error : ''}
      error={!!(touched && error)}
      variant="outlined"
      label={label}
      className={classes.textField}
    />
  );
};

export default InputElement;
