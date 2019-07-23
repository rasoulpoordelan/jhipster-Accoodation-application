import { Moment } from 'moment';

export const enum OrderStatus {
  INIT = 'INIT',
  PAYMENT = 'PAYMENT',
  FINISH = 'FINISH',
  CANCEL = 'CANCEL'
}

export interface IOrderMySuffix {
  id?: number;
  userId?: string;
  date?: Moment;
  status?: OrderStatus;
}

export class OrderMySuffix implements IOrderMySuffix {
  constructor(public id?: number, public userId?: string, public date?: Moment, public status?: OrderStatus) {}
}
