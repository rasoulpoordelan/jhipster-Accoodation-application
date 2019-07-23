import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

export interface ITagMySuffix {
  id?: number;
  name?: string;
  tags?: IPlaceTagMySuffix[];
}

export class TagMySuffix implements ITagMySuffix {
  constructor(public id?: number, public name?: string, public tags?: IPlaceTagMySuffix[]) {}
}
