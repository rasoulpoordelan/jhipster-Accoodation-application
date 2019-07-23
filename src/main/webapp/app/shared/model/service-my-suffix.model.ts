import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

export interface IServiceMySuffix {
  id?: number;
  name?: string;
  services?: IPlaceServiceMySuffix[];
}

export class ServiceMySuffix implements IServiceMySuffix {
  constructor(public id?: number, public name?: string, public services?: IPlaceServiceMySuffix[]) {}
}
