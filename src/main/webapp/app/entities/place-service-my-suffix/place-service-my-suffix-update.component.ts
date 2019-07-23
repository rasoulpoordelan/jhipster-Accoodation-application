import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlaceServiceMySuffix, PlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';
import { PlaceServiceMySuffixService } from './place-service-my-suffix.service';
import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';
import { ServiceMySuffixService } from 'app/entities/service-my-suffix';

@Component({
  selector: 'jhi-place-service-my-suffix-update',
  templateUrl: './place-service-my-suffix-update.component.html'
})
export class PlaceServiceMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  services: IServiceMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    price: [],
    serviceId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placeServiceService: PlaceServiceMySuffixService,
    protected serviceService: ServiceMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placeService }) => {
      this.updateForm(placeService);
    });
    this.serviceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IServiceMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IServiceMySuffix[]>) => response.body)
      )
      .subscribe((res: IServiceMySuffix[]) => (this.services = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(placeService: IPlaceServiceMySuffix) {
    this.editForm.patchValue({
      id: placeService.id,
      name: placeService.name,
      price: placeService.price,
      serviceId: placeService.serviceId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placeService = this.createFromForm();
    if (placeService.id !== undefined) {
      this.subscribeToSaveResponse(this.placeServiceService.update(placeService));
    } else {
      this.subscribeToSaveResponse(this.placeServiceService.create(placeService));
    }
  }

  private createFromForm(): IPlaceServiceMySuffix {
    return {
      ...new PlaceServiceMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      price: this.editForm.get(['price']).value,
      serviceId: this.editForm.get(['serviceId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceServiceMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackServiceById(index: number, item: IServiceMySuffix) {
    return item.id;
  }
}
