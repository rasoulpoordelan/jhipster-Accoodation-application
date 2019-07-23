export interface IPlaceAreaMySuffix {
  id?: number;
  name?: string;
}

export class PlaceAreaMySuffix implements IPlaceAreaMySuffix {
  constructor(public id?: number, public name?: string) {}
}
