import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlaceCategoryMySuffix, PlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';
import { PlaceCategoryMySuffixService } from './place-category-my-suffix.service';

@Component({
  selector: 'jhi-place-category-my-suffix-update',
  templateUrl: './place-category-my-suffix-update.component.html'
})
export class PlaceCategoryMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected placeCategoryService: PlaceCategoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placeCategory }) => {
      this.updateForm(placeCategory);
    });
  }

  updateForm(placeCategory: IPlaceCategoryMySuffix) {
    this.editForm.patchValue({
      id: placeCategory.id,
      name: placeCategory.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placeCategory = this.createFromForm();
    if (placeCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.placeCategoryService.update(placeCategory));
    } else {
      this.subscribeToSaveResponse(this.placeCategoryService.create(placeCategory));
    }
  }

  private createFromForm(): IPlaceCategoryMySuffix {
    return {
      ...new PlaceCategoryMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceCategoryMySuffix>>) {
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
