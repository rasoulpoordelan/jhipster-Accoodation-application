import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

@Component({
  selector: 'jhi-place-service-my-suffix-detail',
  templateUrl: './place-service-my-suffix-detail.component.html'
})
export class PlaceServiceMySuffixDetailComponent implements OnInit {
  placeService: IPlaceServiceMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeService }) => {
      this.placeService = placeService;
    });
  }

  previousState() {
    window.history.back();
  }
}
