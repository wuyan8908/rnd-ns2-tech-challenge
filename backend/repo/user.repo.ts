import { BaseRepo } from "./base.repo";
import { IUser, users } from './data';

export class UserRepo extends BaseRepo<IUser> {

  constructor() {
    super(users);
  }
  private paginate(data: IUser[], page: number, pageSize: number) {
    const offset = page * pageSize;
    return data.slice(offset, offset + pageSize);
  }
  async select(filter: { username?: string, page: number, pageSize: number }): Promise<IUser[]> {
    const { username, page, pageSize } = filter;

    // Filter by username if specified
    let filtered = username
      ? await super.select({ username })
      : this._data;

    // Apply pagination
    const paginated = this.paginate(filtered, page, pageSize);

    return Promise.resolve(paginated);
  }
}