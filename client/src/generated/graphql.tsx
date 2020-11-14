import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getSale: Sale;
  getAllSales: Array<Sale>;
  getProduct: Product;
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetSaleArgs = {
  saleId: Scalars['ID'];
};


export type QueryGetAllSalesArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetProductArgs = {
  productId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  sales: Array<Sale>;
  fullName: Scalars['String'];
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  subject: Scalars['String'];
  user: User;
  products: Array<Product>;
};


export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  sale: Sale;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  login: RegisterResponse;
  createSale: Sale;
  updateSale: Sale;
  deleteSale: Scalars['String'];
  addProduct: Product;
  updateProduct: Product;
  deleteProduct: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationCreateSaleArgs = {
  data: CreateSaleInput;
};


export type MutationUpdateSaleArgs = {
  data: UpdateSaleInput;
};


export type MutationDeleteSaleArgs = {
  saleId: Scalars['ID'];
};


export type MutationAddProductArgs = {
  data: AddProductInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['ID'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user: User;
  token: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateSaleInput = {
  subject: Scalars['String'];
};

export type UpdateSaleInput = {
  saleId: Scalars['ID'];
  subject: Scalars['String'];
};

export type AddProductInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  saleId: Scalars['ID'];
};

export type UpdateProductInput = {
  productId: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type GetAllSalesQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type GetAllSalesQuery = (
  { __typename?: 'Query' }
  & { getAllSales: Array<(
    { __typename?: 'Sale' }
    & Pick<Sale, 'id' | 'subject'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ), products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'description' | 'price'>
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'fullName'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'fullName'>
    ) }
  ) }
);

export type GetUserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'fullName'>
  ) }
);


export const GetAllSalesDocument = gql`
    query GetAllSales($take: Int, $skip: Int) {
  getAllSales(take: $take, skip: $skip) {
    id
    subject
    user {
      id
      fullName
    }
    products {
      id
      name
      description
      price
    }
  }
}
    `;

/**
 * __useGetAllSalesQuery__
 *
 * To run a query within a React component, call `useGetAllSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSalesQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetAllSalesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSalesQuery, GetAllSalesQueryVariables>) {
        return Apollo.useQuery<GetAllSalesQuery, GetAllSalesQueryVariables>(GetAllSalesDocument, baseOptions);
      }
export function useGetAllSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSalesQuery, GetAllSalesQueryVariables>) {
          return Apollo.useLazyQuery<GetAllSalesQuery, GetAllSalesQueryVariables>(GetAllSalesDocument, baseOptions);
        }
export type GetAllSalesQueryHookResult = ReturnType<typeof useGetAllSalesQuery>;
export type GetAllSalesLazyQueryHookResult = ReturnType<typeof useGetAllSalesLazyQuery>;
export type GetAllSalesQueryResult = Apollo.QueryResult<GetAllSalesQuery, GetAllSalesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    user {
      id
      email
      firstName
      lastName
      fullName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    token
    user {
      id
      email
      firstName
      lastName
      fullName
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID) {
  getUser(id: $id) {
    id
    email
    firstName
    lastName
    fullName
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;