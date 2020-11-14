import React, { useState } from 'react';
import {
  CircularProgress,
  Box,
  TextField,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Fab, Popover } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { gql } from '@apollo/client';

import Sale from '../../components/Sale';
import {
  useGetAllSalesQuery,
  useCreateSaleMutation,
} from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  overflowXVisible: {
    overflowX: 'visible',
  },
}));

const Home: React.FC = () => {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const { data, loading } = useGetAllSalesQuery();
  const [createSale] = useCreateSaleMutation({
    update(cache, { data: { createSale } }: any) {
      cache.modify({
        fields: {
          getAllSales(existingSales = []) {
            const newSaleRef = cache.writeFragment({
              data: createSale,
              fragment: gql`
                fragment NewSale on Sale {
                  id
                  subject
                  user {
                    id
                    fullName
                  }
                }
              `,
            });
            return [...existingSales, newSaleRef];
          },
        },
      });
    },
  });
  const classes = useStyles();

  const handleOpenPopover = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClosePopover = (): void => {
    setValue('');
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(e.target.value);
  };

  const handleAddSale = async (): Promise<void> => {
    await createSale({ variables: { data: { subject: value } } });
    setValue('');
  };

  return (
    <Box height="100vh" padding={4}>
      {loading ? (
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={300} color="primary" />
        </Box>
      ) : (
        <Box
          height="100%"
          display="flex"
          alignItems="flex-start"
          position="relative"
        >
          <Box clone position="absolute" right={0} top={0}>
            <Fab onClick={handleOpenPopover} color="secondary">
              <Add fontSize="large" />
            </Fab>
          </Box>
          {data?.getAllSales.map((sale) => (
            <Sale key={sale.id} {...sale} />
          ))}
          <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
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
                  <Button onClick={handleAddSale} color="primary">
                    ADD
                  </Button>
                ),
              }}
            />
          </Popover>
        </Box>
      )}
    </Box>
  );
};

export default Home;
