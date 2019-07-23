import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  AttributeMySuffixComponent,
  AttributeMySuffixDetailComponent,
  AttributeMySuffixUpdateComponent,
  AttributeMySuffixDeletePopupComponent,
  AttributeMySuffixDeleteDialogComponent,
  attributeRoute,
  attributePopupRoute
} from './';

const ENTITY_STATES = [...attributeRoute, ...attributePopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AttributeMySuffixComponent,
    AttributeMySuffixDetailComponent,
    AttributeMySuffixUpdateComponent,
    AttributeMySuffixDeleteDialogComponent,
    AttributeMySuffixDeletePopupComponent
  ],
  entryComponents: [
    AttributeMySuffixComponent,
    AttributeMySuffixUpdateComponent,
    AttributeMySuffixDeleteDialogComponent,
    AttributeMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationAttributeMySuffixModule {}
