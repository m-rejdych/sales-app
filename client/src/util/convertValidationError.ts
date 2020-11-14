interface ValidationError {
  graphQLErrors: [
    {
      extensions: {
        exception: {
          validationErrors: {
            constraints: { [key: string]: string };
            property: string;
          }[];
        };
      };
    },
  ];
}

const convertValidationError = (
  error: ValidationError,
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  error.graphQLErrors[0].extensions.exception.validationErrors.forEach(
    ({ constraints, property }) => {
      errors[property] = Object.entries(constraints)
        .map(([, message]) => message)
        .join(' ');
    },
  );

  return errors;
};

export default convertValidationError;
