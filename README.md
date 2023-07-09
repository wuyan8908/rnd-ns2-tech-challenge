# Tech Challenge for the Full Stack Developer

Tech Challenge is to create a GraphQL Server with Node.js and Express.js, and frontend with sveltejs

We'll provide an example server and a server that's already partially completed with devices.  You'll modify the second server for your tech challenge.

### Question 1
The query below does not support pagination; so it takes too long to retrieve the data; please add support for pagination into the query
```
query Query {
    Users{
        data{
            id
            username
            companies{
                id
                name
            }
        }
    }
}
```

the user type should be 
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

The query below has n+1 problem; please refactor the Users query to solve that problem
```
query Query {
    Users{
        data{
            id
            username
            companies{
                id
                name
            }
        }
    }
}
```

### Question 3

the Users list in frontend shows mock data; Please modify the code; so it can display the users from backend with pagination

### Question 4

Please extend the front end that allows users to create new user data (only username for now); and persist into backend by making a new mutation for creating user
