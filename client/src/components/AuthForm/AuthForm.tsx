import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import InputElement from '../InputElement';
import {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  RegisterInput,
  LoginInput,
} from '../../generated/graphql';

interface Props {
  isLoggingIn: boolean;
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    height: ({ isLoggingIn }: Props): number => (isLoggingIn ? 331 : 535),
    position: 'relative',
    overflow: 'visible',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  switchLoginModeLink: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(1)}px)`,
    left: theme.spacing(1),
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  submitButton: {
    minWidth: 110,
  },
}));

const AuthForm: React.FC<Props> = ({ isLoggingIn }) => {
  const history = useHistory();
  const [login, { loading: loginLoading }] = useLoginMutation();
  const [register, { loading: registerLoading }] = useRegisterMutation();
  const { refetch } = useGetUserQuery();
  const classes = useStyles({ isLoggingIn });

  const initialValues = isLoggingIn
    ? {
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      };

  const fields = [
    {
      name: 'email',
      type: 'email',
      label: 'Email adress',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          )
        )
          errorMessage = 'Enter a valid email!';
        return errorMessage;
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!/^(?=.*\d).{4,8}$/.test(value))
          errorMessage =
            'Password should be at least 4 characters long and contain at least one digit!';
        return errorMessage;
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First name',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.length < 2)
          errorMessage = 'First name should be at lest 2 characters long!';
        return errorMessage;
      },
      hidden: isLoggingIn,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last name',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.length < 2)
          errorMessage = 'Last name should be at lest 2 characters long!';
        return errorMessage;
      },
      hidden: isLoggingIn,
    },
  ];

  const handleSwitchLoginMode = (handleReset: () => void): void => {
    handleReset();
    history.push(isLoggingIn ? '/register' : '/login');
  };

  const handleSubmit = async (
    values: RegisterInput | LoginInput,
  ): Promise<void> => {
    if (isLoggingIn) {
      const response = await login({
        variables: { data: values as LoginInput },
      });
      if (response.data) {
        const {
          data: {
            login: { token },
          },
        } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
        await refetch();
        history.push('/home');
      }
    } else {
      const response = await register({
        variables: { data: values as RegisterInput },
      });
      if (response.data) {
        const {
          data: {
            register: { token },
          },
        } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
        await refetch();
        history.push('/home');
      }
    }
  };

  return (
    <Card elevation={3} className={classes.card}>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ handleReset, values, isValid, dirty }) => (
          <>
            <CardHeader title={isLoggingIn ? 'Login' : 'Register'} />
            <CardContent className={classes.cardContent}>
              {fields
                .filter(({ hidden }) => !hidden)
                .map((field) => (
                  <InputElement key={field.name} {...field} />
                ))}
            </CardContent>
            <CardActions>
              <Button
                disabled={!(isValid && dirty)}
                color="primary"
                variant="contained"
                onClick={() => handleSubmit(values)}
                className={classes.submitButton}
              >
                {loginLoading || registerLoading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : isLoggingIn ? (
                  'Login'
                ) : (
                  'Register'
                )}
              </Button>
            </CardActions>
            <Typography
              variant="caption"
              color="secondary"
              className={classes.switchLoginModeLink}
              onClick={() => handleSwitchLoginMode(handleReset)}
            >
              {isLoggingIn
                ? "Don't have an account? Register!"
                : 'Already have an account? Login!'}
            </Typography>
          </>
        )}
      </Formik>
    </Card>
  );
};

export default AuthForm;
