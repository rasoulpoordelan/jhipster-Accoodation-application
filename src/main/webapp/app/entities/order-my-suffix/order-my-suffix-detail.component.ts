import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderMySuffix } from 'app/shared/model/order-my-suffix.model';

@Component({
  selector: 'jhi-order-my-suffix-detail',
  templateUrl: './order-my-suffix-detail.component.html'
})
export class OrderMySuffixDetailComponent implements OnInit {
  order: IOrderMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.order = order;
    });
  }

  previousState() {
    window.history.back();
  }
}
