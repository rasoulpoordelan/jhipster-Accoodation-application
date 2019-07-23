export interface IPlaceServiceMySuffix {
  id?: number;
  name?: string;
  price?: number;
  serviceId?: number;
}

export class PlaceServiceMySuffix implements IPlaceServiceMySuffix {
  constructor(public id?: number, public name?: string, public price?: number, public serviceId?: number) {}
}
