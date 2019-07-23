import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

@Component({
  selector: 'jhi-place-category-my-suffix-detail',
  templateUrl: './place-category-my-suffix-detail.component.html'
})
export class PlaceCategoryMySuffixDetailComponent implements OnInit {
  placeCategory: IPlaceCategoryMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeCategory }) => {
      this.placeCategory = placeCategory;
    });
  }

  previousState() {
    window.history.back();
  }
}
