import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  CityMySuffixComponent,
  CityMySuffixDetailComponent,
  CityMySuffixUpdateComponent,
  CityMySuffixDeletePopupComponent,
  CityMySuffixDeleteDialogComponent,
  cityRoute,
  cityPopupRoute
} from './';

const ENTITY_STATES = [...cityRoute, ...cityPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CityMySuffixComponent,
    CityMySuffixDetailComponent,
    CityMySuffixUpdateComponent,
    CityMySuffixDeleteDialogComponent,
    CityMySuffixDeletePopupComponent
  ],
  entryComponents: [
    CityMySuffixComponent,
    CityMySuffixUpdateComponent,
    CityMySuffixDeleteDialogComponent,
    CityMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationCityMySuffixModule {}
