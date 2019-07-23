import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  OrderMySuffixComponent,
  OrderMySuffixDetailComponent,
  OrderMySuffixUpdateComponent,
  OrderMySuffixDeletePopupComponent,
  OrderMySuffixDeleteDialogComponent,
  orderRoute,
  orderPopupRoute
} from './';

const ENTITY_STATES = [...orderRoute, ...orderPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrderMySuffixComponent,
    OrderMySuffixDetailComponent,
    OrderMySuffixUpdateComponent,
    OrderMySuffixDeleteDialogComponent,
    OrderMySuffixDeletePopupComponent
  ],
  entryComponents: [
    OrderMySuffixComponent,
    OrderMySuffixUpdateComponent,
    OrderMySuffixDeleteDialogComponent,
    OrderMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationOrderMySuffixModule {}
