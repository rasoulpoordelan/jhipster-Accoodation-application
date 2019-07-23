import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

@Component({
  selector: 'jhi-service-my-suffix-detail',
  templateUrl: './service-my-suffix-detail.component.html'
})
export class ServiceMySuffixDetailComponent implements OnInit {
  service: IServiceMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ service }) => {
      this.service = service;
    });
  }

  previousState() {
    window.history.back();
  }
}
