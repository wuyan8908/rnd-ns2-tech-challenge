export const delay = (milliseconds: number): Promise<void> => {
     return new Promise((resolve) => {
       setTimeout(resolve, milliseconds);
     });
};
   
export class BaseRepo<T> {

     protected _data: T[];

     constructor(data: T[]){
          this._data = data;
     }

     async select(where?: Partial<T>, whereIn?: {fieldName: string, data: any[]}[]): Promise<T[]> {
          let rs = this._data;
          if (where) {
               rs = Object.entries(where).reduce((acc, [key, value]) => {
                    return acc.filter(r => r[key as keyof T] === value);
               }, rs);
          }
          if (whereIn) {
               rs = whereIn.reduce((acc, {fieldName, data}) => {
                    return acc.filter(r => data.includes( r[fieldName as keyof T] ));
               }, rs);
          }          

          console.log('rs = ', rs)


          for(const _ of rs){
               await delay(1);
          }
          
          return Promise.resolve(rs);
     }     
}