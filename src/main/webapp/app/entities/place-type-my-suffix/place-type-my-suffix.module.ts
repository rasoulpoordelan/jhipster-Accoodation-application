import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceTypeMySuffixComponent,
  PlaceTypeMySuffixDetailComponent,
  PlaceTypeMySuffixUpdateComponent,
  PlaceTypeMySuffixDeletePopupComponent,
  PlaceTypeMySuffixDeleteDialogComponent,
  placeTypeRoute,
  placeTypePopupRoute
} from './';

const ENTITY_STATES = [...placeTypeRoute, ...placeTypePopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceTypeMySuffixComponent,
    PlaceTypeMySuffixDetailComponent,
    PlaceTypeMySuffixUpdateComponent,
    PlaceTypeMySuffixDeleteDialogComponent,
    PlaceTypeMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceTypeMySuffixComponent,
    PlaceTypeMySuffixUpdateComponent,
    PlaceTypeMySuffixDeleteDialogComponent,
    PlaceTypeMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceTypeMySuffixModule {}
