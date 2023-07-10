import { companies } from "repo/data";
import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {

  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  //Changed to selectWithPagination function which support Pagination.
  async getUsers(filter: { username?: string }, pagination: { page: number, pageSize: number }): Promise<any> {
    return await this._userRepo.selectWithPagination(filter, pagination)
  }

  async getUserCompanies(filter: { companyIds: number[] }): Promise<any> {
    return await this._companyRepo.select(undefined, [{ fieldName: 'id', data: filter.companyIds }]);
  }

  async getCompanies(filter: { name?: string }): Promise<any> {
    return await this._companyRepo.select(filter);
  }

  async getCompanyRooms(filter: { name?: string, companyId?: number }): Promise<any> {
    return await this._roomRepo.select(filter);
  }

  async createUser(username: string): Promise<any> {
    const newUser = await this._userRepo.create({ username });
    return newUser;
  }

}
