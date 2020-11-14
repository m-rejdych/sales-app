import React, { useState } from 'react';
import { Popover, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overflowXVisible: {
    overflowX: 'visible',
  },
}));

interface Props {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  handleClose: () => void;
  handleUpdateSale: (value: string) => Promise<void>;
}

const EditSalePopover: React.FC<Props> = ({
  open,
  anchorEl,
  handleClose,
  handleUpdateSale,
}) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (): void => {
    handleUpdateSale(value);
    setValue('');
  };

  const handleCancel = (): void => {
    handleClose();
    setValue('');
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={handleCancel}
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
            <Button onClick={handleSubmit} color="primary">
              Update
            </Button>
          ),
        }}
      />
    </Popover>
  );
};

export default EditSalePopover;
