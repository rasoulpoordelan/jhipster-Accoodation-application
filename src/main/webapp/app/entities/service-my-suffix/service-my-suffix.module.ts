import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  ServiceMySuffixComponent,
  ServiceMySuffixDetailComponent,
  ServiceMySuffixUpdateComponent,
  ServiceMySuffixDeletePopupComponent,
  ServiceMySuffixDeleteDialogComponent,
  serviceRoute,
  servicePopupRoute
} from './';

const ENTITY_STATES = [...serviceRoute, ...servicePopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ServiceMySuffixComponent,
    ServiceMySuffixDetailComponent,
    ServiceMySuffixUpdateComponent,
    ServiceMySuffixDeleteDialogComponent,
    ServiceMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ServiceMySuffixComponent,
    ServiceMySuffixUpdateComponent,
    ServiceMySuffixDeleteDialogComponent,
    ServiceMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationServiceMySuffixModule {}
