import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

@Component({
  selector: 'jhi-place-tag-my-suffix-detail',
  templateUrl: './place-tag-my-suffix-detail.component.html'
})
export class PlaceTagMySuffixDetailComponent implements OnInit {
  placeTag: IPlaceTagMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeTag }) => {
      this.placeTag = placeTag;
    });
  }

  previousState() {
    window.history.back();
  }
}
