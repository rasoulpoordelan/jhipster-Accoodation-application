import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceServiceMySuffixComponent,
  PlaceServiceMySuffixDetailComponent,
  PlaceServiceMySuffixUpdateComponent,
  PlaceServiceMySuffixDeletePopupComponent,
  PlaceServiceMySuffixDeleteDialogComponent,
  placeServiceRoute,
  placeServicePopupRoute
} from './';

const ENTITY_STATES = [...placeServiceRoute, ...placeServicePopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceServiceMySuffixComponent,
    PlaceServiceMySuffixDetailComponent,
    PlaceServiceMySuffixUpdateComponent,
    PlaceServiceMySuffixDeleteDialogComponent,
    PlaceServiceMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceServiceMySuffixComponent,
    PlaceServiceMySuffixUpdateComponent,
    PlaceServiceMySuffixDeleteDialogComponent,
    PlaceServiceMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceServiceMySuffixModule {}
