import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

@Component({
  selector: 'jhi-place-area-my-suffix-detail',
  templateUrl: './place-area-my-suffix-detail.component.html'
})
export class PlaceAreaMySuffixDetailComponent implements OnInit {
  placeArea: IPlaceAreaMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeArea }) => {
      this.placeArea = placeArea;
    });
  }

  previousState() {
    window.history.back();
  }
}
