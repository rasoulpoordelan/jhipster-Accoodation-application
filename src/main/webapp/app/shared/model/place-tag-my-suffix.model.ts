import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

export interface IPlaceTagMySuffix {
  id?: number;
  name?: string;
  tagId?: number;
  placeTags?: IPlaceMySuffix[];
}

export class PlaceTagMySuffix implements IPlaceTagMySuffix {
  constructor(public id?: number, public name?: string, public tagId?: number, public placeTags?: IPlaceMySuffix[]) {}
}
