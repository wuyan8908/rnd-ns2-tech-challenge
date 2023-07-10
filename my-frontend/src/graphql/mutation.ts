import { gql } from '@urql/core';

export const CREATE_USER = gql`
  mutation ($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;