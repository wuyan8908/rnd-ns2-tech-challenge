import { BaseRepo } from './base.repo';
import { ICompany, companies } from './data';

export class CompanyRepo extends BaseRepo<ICompany> {

     constructor(){
          super(companies);
     }

}