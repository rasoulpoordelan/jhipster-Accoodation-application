import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';

@Component({
  selector: 'jhi-city-my-suffix-detail',
  templateUrl: './city-my-suffix-detail.component.html'
})
export class CityMySuffixDetailComponent implements OnInit {
  city: ICityMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ city }) => {
      this.city = city;
    });
  }

  previousState() {
    window.history.back();
  }
}
