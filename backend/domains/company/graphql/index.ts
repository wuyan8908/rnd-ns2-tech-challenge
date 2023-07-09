export default `
  type CompaniesResponseType {
    data: [CompanyType]
  }

  type UsersResponseType {
    data: [UserType]
    meta: [MetaType]
  }

  type MetaType {
    pagination: [PaginationType]
  }

  type RoomType {
    id: Int
    name: String
  }

  type UserType {
    id: Int
    username: String
    companies: [CompanyType]
  }

  type PaginationType{
    totalOfPage: Int
    page: Int
    totalOfRecord: Int
    pageSize: Int
  }

  type CompanyType {
    id: Int
    name: String
    rooms: [RoomType]
  }
  
  type RoomsResponseType {
    data: [RoomType]
  }

  input RoomFilterInput {    
    name: String
  }

  input CompanyFilterInput {    
    name: String
  }

  input UserFilterInput {    
    username: String
  }

  input UserPaginationInput {    
    page: Int
    pageSize: Int
  }

  type Query {
    Companies(filter: CompanyFilterInput): CompaniesResponseType
    Rooms(filter: RoomFilterInput): RoomsResponseType
    Users(filter: UserFilterInput, pagination:UserPaginationInput ): UsersResponseType
  }
`;
