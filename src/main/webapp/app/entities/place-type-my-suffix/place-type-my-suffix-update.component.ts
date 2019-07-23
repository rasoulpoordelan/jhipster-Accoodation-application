import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlaceTypeMySuffix, PlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';
import { PlaceTypeMySuffixService } from './place-type-my-suffix.service';
import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix';

@Component({
  selector: 'jhi-place-type-my-suffix-update',
  templateUrl: './place-type-my-suffix-update.component.html'
})
export class PlaceTypeMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  places: IPlaceMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    placeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placeTypeService: PlaceTypeMySuffixService,
    protected placeService: PlaceMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placeType }) => {
      this.updateForm(placeType);
    });
    this.placeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaceMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaceMySuffix[]>) => response.body)
      )
      .subscribe((res: IPlaceMySuffix[]) => (this.places = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(placeType: IPlaceTypeMySuffix) {
    this.editForm.patchValue({
      id: placeType.id,
      name: placeType.name,
      placeId: placeType.placeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placeType = this.createFromForm();
    if (placeType.id !== undefined) {
      this.subscribeToSaveResponse(this.placeTypeService.update(placeType));
    } else {
      this.subscribeToSaveResponse(this.placeTypeService.create(placeType));
    }
  }

  private createFromForm(): IPlaceTypeMySuffix {
    return {
      ...new PlaceTypeMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      placeId: this.editForm.get(['placeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceTypeMySuffix>>) {
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

  trackPlaceById(index: number, item: IPlaceMySuffix) {
    return item.id;
  }
}
