import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IOrderMySuffix, OrderMySuffix } from 'app/shared/model/order-my-suffix.model';
import { OrderMySuffixService } from './order-my-suffix.service';

@Component({
  selector: 'jhi-order-my-suffix-update',
  templateUrl: './order-my-suffix-update.component.html'
})
export class OrderMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    userId: [],
    date: [],
    status: []
  });

  constructor(protected orderService: OrderMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);
    });
  }

  updateForm(order: IOrderMySuffix) {
    this.editForm.patchValue({
      id: order.id,
      userId: order.userId,
      date: order.date,
      status: order.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrderMySuffix {
    return {
      ...new OrderMySuffix(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      date: this.editForm.get(['date']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
