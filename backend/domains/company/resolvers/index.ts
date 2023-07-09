import { CompanyService } from "../service";
export default {
  Query: {
    async Users(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter, pagination } = args;
      const _companyService = new CompanyService();
      // Changed data to usersResponse since we added pagination meta to usersResponse Type.
      const usersResponse = await _companyService.getUsers(filter, { page: pagination.page ?? 0, pageSize: pagination.pageSize ?? 20 });
      return usersResponse;
    },
    async Companies(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter } = args;
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanies(filter);
      return { data };
    },
    async Rooms(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter } = args;
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanyRooms(filter);
      return { data };
    },
  },
  CompanyType: {
    async rooms(parent: any, args: any, context: any, info: any): Promise<any> {
      const { id } = parent
      return context.roomsLoader.load(id)
    },
  },
  UserType: {
    async companies(parent: any, args: any, context: any, info: any): Promise<any> {
      const { companyIds } = parent
      return context.companyLoader.loadMany(companyIds);
    },
  }
};
