import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

@Component({
  selector: 'jhi-attribute-my-suffix-detail',
  templateUrl: './attribute-my-suffix-detail.component.html'
})
export class AttributeMySuffixDetailComponent implements OnInit {
  attribute: IAttributeMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attribute }) => {
      this.attribute = attribute;
    });
  }

  previousState() {
    window.history.back();
  }
}
