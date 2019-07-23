import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceAreaMySuffixComponent,
  PlaceAreaMySuffixDetailComponent,
  PlaceAreaMySuffixUpdateComponent,
  PlaceAreaMySuffixDeletePopupComponent,
  PlaceAreaMySuffixDeleteDialogComponent,
  placeAreaRoute,
  placeAreaPopupRoute
} from './';

const ENTITY_STATES = [...placeAreaRoute, ...placeAreaPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceAreaMySuffixComponent,
    PlaceAreaMySuffixDetailComponent,
    PlaceAreaMySuffixUpdateComponent,
    PlaceAreaMySuffixDeleteDialogComponent,
    PlaceAreaMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceAreaMySuffixComponent,
    PlaceAreaMySuffixUpdateComponent,
    PlaceAreaMySuffixDeleteDialogComponent,
    PlaceAreaMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceAreaMySuffixModule {}
