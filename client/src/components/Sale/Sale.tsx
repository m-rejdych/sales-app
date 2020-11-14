import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { User, Product } from '../../generated/graphql';

interface Props {
  id: string;
  subject: string;
  user: User;
  products: Product[];
}

const Sale: React.FC<Props> = ({ subject, user: { fullName }, products }) => {
  return (
    <Card>
      <CardHeader title={`${subject} sale`} subheader={fullName} />
      <CardContent>
        <Dialog>
          <DialogTitle>{`${subject} sale`}</DialogTitle>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Sale;
