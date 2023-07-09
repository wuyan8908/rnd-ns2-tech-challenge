import { companies } from "repo/data";
import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {

  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  async getUsers(filter: { username?: string }, pagination: { page: number, pageSize: number }): Promise<any> {
    // const filteredUsers = await this._userRepo.select(filter);
    // if (filteredUsers.length > pagination.pageSize) {
    //   const offset = pagination.page * pagination.pageSize;

    //   console.log("test", filteredUsers.length, offset, pagination.pageSize, pagination.page)
    //   return filteredUsers.slice(offset, offset + pagination.pageSize);
    // } else {
    //   return filteredUsers
    // }
    return await this._userRepo.select({ ...filter, page: pagination.page, pageSize: pagination.pageSize })
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

}
