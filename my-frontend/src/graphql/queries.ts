import { gql } from '@urql/core';

export const GET_USERS = gql`
   query ($page: Int, $pageSize: Int, $username: String) {
    Users(pagination: {page: $page, pageSize: $pageSize}, filter: {username: $username}) {
      data {
        id
        username
        companies {
        id
        name
        rooms {
          id
          name
        }
      }
      }
      meta {
        pagination {
          page
          pageSize
          totalOfPage
          totalOfRecord
        }
      }
    }
  }
`;