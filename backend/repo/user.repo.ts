import { BaseRepo } from "./base.repo";
import { IUser, users } from './data';

export class UserRepo extends BaseRepo<IUser> {

  constructor() {
    super(users);
  }

  private paginate(data: IUser[], page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    return data.slice(offset, offset + pageSize);
  }

  async selectWithPagination(filter: { username?: string }, pagination: { page: number, pageSize: number }): Promise<{
    data: IUser[], meta: {
      pagination: {
        page: number;
        pageSize: number;
        totalOfPage: number;
        totalOfRecord: number;
      }
    }
  }> {
    const { page, pageSize } = pagination;

    // Filter by username if specified, otherwise return all user data.
    let filtered = filter?.username
      ? await super.select({ username: filter.username })
      : this._data;

    // Apply pagination
    const paginated = this.paginate(filtered, page, pageSize);

    // Adding pagination meta data to response.
    return Promise.resolve({
      data: paginated, meta: {
        pagination: {
          page: page,
          pageSize: pageSize,
          totalOfPage: Math.ceil(filtered.length / pageSize),
          totalOfRecord: filtered.length
        }
      }
    });
  }
}