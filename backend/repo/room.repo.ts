import { BaseRepo } from "./base.repo";
import { IRoom, rooms } from './data';

export class RoomRepo extends BaseRepo<IRoom> {

     constructor(){
          super(rooms);
     }
     
}