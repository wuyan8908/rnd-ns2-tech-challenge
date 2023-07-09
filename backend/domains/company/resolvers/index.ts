import { companies } from "repo/data";
import { CompanyService } from "../service";
export default {
  Query: {
    async Users(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter, pagination } = args;
      const _companyService = new CompanyService();


      //first we get the filtered Users than we do the pagination.
      const data = await _companyService.getUsers(filter, { page: pagination.page ?? 0, pageSize: pagination.pageSize ?? 20 });


      // const meta = {
      //   pagination: calculatePagination(page, pageSize, totalCount)
      // };

      return { data };
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
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanyRooms({ companyId: id });
      return data;
    },
  },
  UserType: {
    async companies(parent: any, args: any, context: any, info: any): Promise<any> {
      const { companyIds } = parent
      const _companyService = new CompanyService();
      const data = await _companyService.getUserCompanies({ companyIds });
      return data;
    },
  }
};


function calculatePagination(page: number, pageSize: number, totalCount: number) {
  const totalOfPage = Math.ceil(totalCount / pageSize);
  return {
    totalOfPage,
    page,
    totalOfRecord: totalCount,
    pageSize,
  };
}