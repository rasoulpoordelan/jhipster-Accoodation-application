import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAccApplicationSharedModule } from 'app/shared';
import {
  TagMySuffixComponent,
  TagMySuffixDetailComponent,
  TagMySuffixUpdateComponent,
  TagMySuffixDeletePopupComponent,
  TagMySuffixDeleteDialogComponent,
  tagRoute,
  tagPopupRoute
} from './';

const ENTITY_STATES = [...tagRoute, ...tagPopupRoute];

@NgModule({
  imports: [JhipsterAccApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TagMySuffixComponent,
    TagMySuffixDetailComponent,
    TagMySuffixUpdateComponent,
    TagMySuffixDeleteDialogComponent,
    TagMySuffixDeletePopupComponent
  ],
  entryComponents: [TagMySuffixComponent, TagMySuffixUpdateComponent, TagMySuffixDeleteDialogComponent, TagMySuffixDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationTagMySuffixModule {}
