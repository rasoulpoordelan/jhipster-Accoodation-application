import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  PlaceCategoryMySuffixComponent,
  PlaceCategoryMySuffixDetailComponent,
  PlaceCategoryMySuffixUpdateComponent,
  PlaceCategoryMySuffixDeletePopupComponent,
  PlaceCategoryMySuffixDeleteDialogComponent,
  placeCategoryRoute,
  placeCategoryPopupRoute
} from './';

const ENTITY_STATES = [...placeCategoryRoute, ...placeCategoryPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaceCategoryMySuffixComponent,
    PlaceCategoryMySuffixDetailComponent,
    PlaceCategoryMySuffixUpdateComponent,
    PlaceCategoryMySuffixDeleteDialogComponent,
    PlaceCategoryMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PlaceCategoryMySuffixComponent,
    PlaceCategoryMySuffixUpdateComponent,
    PlaceCategoryMySuffixDeleteDialogComponent,
    PlaceCategoryMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationPlaceCategoryMySuffixModule {}
