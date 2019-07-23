import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

export interface IAttributeMySuffix {
  id?: number;
  name?: string;
  attributes?: IPlaceMySuffix[];
}

export class AttributeMySuffix implements IAttributeMySuffix {
  constructor(public id?: number, public name?: string, public attributes?: IPlaceMySuffix[]) {}
}
