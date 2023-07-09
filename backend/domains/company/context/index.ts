import DataLoader from "dataloader";
import { CompanyService } from "../service";

export const createContext = ({ request }: any) => {
  return {
    companyLoader: new DataLoader(async (companyIds: readonly number[]) => {
      const _companyService = new CompanyService();
      const companies = await _companyService.getUserCompanies({ companyIds: [...companyIds] });
      const companyMap = new Map(companies.map((company: any) => [company.id, company]));
      return companyIds.map(id => companyMap.get(id));
    }),
    roomsLoader: new DataLoader(async (companyIds: readonly number[]) => {
      const _companyService = new CompanyService();
      const roomsArray = await Promise.all(companyIds.map((companyId) =>
        _companyService.getCompanyRooms({ companyId })
      ));
      return roomsArray;
    })
  };
};
