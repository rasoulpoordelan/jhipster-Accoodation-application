import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceMySuffixComponent,
  PlaceMySuffixDetailComponent,
  PlaceMySuffixUpdateComponent,
  PlaceMySuffixDeletePopupComponent,
  PlaceMySuffixDeleteDialogComponent,
  placeRoute,
  placePopupRoute
} from './';

const ENTITY_STATES = [...placeRoute, ...placePopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceMySuffixComponent,
    PlaceMySuffixDetailComponent,
    PlaceMySuffixUpdateComponent,
    PlaceMySuffixDeleteDialogComponent,
    PlaceMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceMySuffixComponent,
    PlaceMySuffixUpdateComponent,
    PlaceMySuffixDeleteDialogComponent,
    PlaceMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceMySuffixModule {}
