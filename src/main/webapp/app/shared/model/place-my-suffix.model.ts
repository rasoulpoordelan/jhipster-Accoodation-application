import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';
import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

export interface IPlaceMySuffix {
  id?: number;
  name?: string;
  key?: string;
  placeOwnerId?: string;
  classCo?: number;
  classExtra?: string;
  metaKeywords?: string;
  metaDescription?: string;
  pageTitle?: string;
  cityId?: string;
  placeAreaId?: number;
  addressLine1?: string;
  addressLine2?: string;
  location?: string;
  phone1?: string;
  phone2?: string;
  fax?: string;
  isVisible?: boolean;
  defaultImageId?: number;
  description?: string;
  rulesAndRegulations?: string;
  selectReason?: string;
  review?: string;
  checkinHour?: number;
  checkoutHour?: number;
  priority?: number;
  totalScore?: number;
  extraPersonPrice?: number;
  halfChargeCheckIn?: number;
  halfChargeCheckOut?: number;
  defaultVideoUrl?: string;
  virtualTourUrl?: string;
  postalCode?: string;
  cancellationPolicy?: string;
  bedroom?: number;
  bathRoom?: number;
  lavatory?: number;
  wC?: number;
  infrastructureArea?: number;
  totalArea?: number;
  capacity?: number;
  maxCapacity?: number;
  registrationSource?: string;
  bookingPolicy?: number;
  reviewStatus?: number;
  status?: number;
  basePrice?: number;
  commission?: number;
  placeTypes?: IPlaceTypeMySuffix[];
  placeAtts?: IAttributeMySuffix[];
  places?: IPlaceTagMySuffix[];
}

export class PlaceMySuffix implements IPlaceMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public key?: string,
    public placeOwnerId?: string,
    public classCo?: number,
    public classExtra?: string,
    public metaKeywords?: string,
    public metaDescription?: string,
    public pageTitle?: string,
    public cityId?: string,
    public placeAreaId?: number,
    public addressLine1?: string,
    public addressLine2?: string,
    public location?: string,
    public phone1?: string,
    public phone2?: string,
    public fax?: string,
    public isVisible?: boolean,
    public defaultImageId?: number,
    public description?: string,
    public rulesAndRegulations?: string,
    public selectReason?: string,
    public review?: string,
    public checkinHour?: number,
    public checkoutHour?: number,
    public priority?: number,
    public totalScore?: number,
    public extraPersonPrice?: number,
    public halfChargeCheckIn?: number,
    public halfChargeCheckOut?: number,
    public defaultVideoUrl?: string,
    public virtualTourUrl?: string,
    public postalCode?: string,
    public cancellationPolicy?: string,
    public bedroom?: number,
    public bathRoom?: number,
    public lavatory?: number,
    public wC?: number,
    public infrastructureArea?: number,
    public totalArea?: number,
    public capacity?: number,
    public maxCapacity?: number,
    public registrationSource?: string,
    public bookingPolicy?: number,
    public reviewStatus?: number,
    public status?: number,
    public basePrice?: number,
    public commission?: number,
    public placeTypes?: IPlaceTypeMySuffix[],
    public placeAtts?: IAttributeMySuffix[],
    public places?: IPlaceTagMySuffix[]
  ) {
    this.isVisible = this.isVisible || false;
  }
}
