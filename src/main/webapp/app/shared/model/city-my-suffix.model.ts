export interface ICityMySuffix {
  id?: number;
  name?: string;
}

export class CityMySuffix implements ICityMySuffix {
  constructor(public id?: number, public name?: string) {}
}
