import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

@Component({
  selector: 'jhi-place-type-my-suffix-detail',
  templateUrl: './place-type-my-suffix-detail.component.html'
})
export class PlaceTypeMySuffixDetailComponent implements OnInit {
  placeType: IPlaceTypeMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeType }) => {
      this.placeType = placeType;
    });
  }

  previousState() {
    window.history.back();
  }
}
