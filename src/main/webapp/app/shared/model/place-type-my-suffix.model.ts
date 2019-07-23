export interface IPlaceTypeMySuffix {
  id?: number;
  name?: string;
  placeId?: number;
}

export class PlaceTypeMySuffix implements IPlaceTypeMySuffix {
  constructor(public id?: number, public name?: string, public placeId?: number) {}
}
