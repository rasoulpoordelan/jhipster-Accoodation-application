export interface IPlaceCategoryMySuffix {
  id?: number;
  name?: string;
}

export class PlaceCategoryMySuffix implements IPlaceCategoryMySuffix {
  constructor(public id?: number, public name?: string) {}
}
