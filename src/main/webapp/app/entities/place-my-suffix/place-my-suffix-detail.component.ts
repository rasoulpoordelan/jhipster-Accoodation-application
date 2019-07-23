import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

@Component({
  selector: 'jhi-place-my-suffix-detail',
  templateUrl: './place-my-suffix-detail.component.html'
})
export class PlaceMySuffixDetailComponent implements OnInit {
  place: IPlaceMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ place }) => {
      this.place = place;
    });
  }

  previousState() {
    window.history.back();
  }
}
