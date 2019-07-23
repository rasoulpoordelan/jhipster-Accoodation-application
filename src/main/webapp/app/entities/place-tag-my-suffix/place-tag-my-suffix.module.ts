import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceTagMySuffixComponent,
  PlaceTagMySuffixDetailComponent,
  PlaceTagMySuffixUpdateComponent,
  PlaceTagMySuffixDeletePopupComponent,
  PlaceTagMySuffixDeleteDialogComponent,
  placeTagRoute,
  placeTagPopupRoute
} from './';

const ENTITY_STATES = [...placeTagRoute, ...placeTagPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceTagMySuffixComponent,
    PlaceTagMySuffixDetailComponent,
    PlaceTagMySuffixUpdateComponent,
    PlaceTagMySuffixDeleteDialogComponent,
    PlaceTagMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceTagMySuffixComponent,
    PlaceTagMySuffixUpdateComponent,
    PlaceTagMySuffixDeleteDialogComponent,
    PlaceTagMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceTagMySuffixModule {}
