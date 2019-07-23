import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlaceAreaMySuffix, PlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';
import { PlaceAreaMySuffixService } from './place-area-my-suffix.service';

@Component({
  selector: 'jhi-place-area-my-suffix-update',
  templateUrl: './place-area-my-suffix-update.component.html'
})
export class PlaceAreaMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected placeAreaService: PlaceAreaMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placeArea }) => {
      this.updateForm(placeArea);
    });
  }

  updateForm(placeArea: IPlaceAreaMySuffix) {
    this.editForm.patchValue({
      id: placeArea.id,
      name: placeArea.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placeArea = this.createFromForm();
    if (placeArea.id !== undefined) {
      this.subscribeToSaveResponse(this.placeAreaService.update(placeArea));
    } else {
      this.subscribeToSaveResponse(this.placeAreaService.create(placeArea));
    }
  }

  private createFromForm(): IPlaceAreaMySuffix {
    return {
      ...new PlaceAreaMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceAreaMySuffix>>) {
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
