# This is the finished challenge for the Full Stack Developer

This Tech challenge is created initially with GraphQL, node.js, Express.js and Svelte Js. 
URQL is installed to support GraphQL API on the client side.

### Question 1

The pagination feature is implemented based on the given type.
Also, implement a simple page selector in question 3. So can easily test this feature. 
Note: The page starts with 1.
```
  type PaginationType{
    totalOfPage: Int
    page: Int
    totalOfRecord: Int
    pageSize: Int
  }

  type UsersResponseType {
    data: [UserType]
    meta: {
      pagination: PaginationType
    }
  }
```

### Question 2

DataLoader is added to the resolvers to solve the n+1 problem.

### Question 3

URQL is used to fetch users from the GraphQL backend. and update the table UI with a page selector. 
the Users list in frontend shows mock data; Please modify the code; so it can display the users from the backend with pagination

### Question 4

A createUser mutation is added to the GraphQL backend.
A simple create user feature is created in the front end.
