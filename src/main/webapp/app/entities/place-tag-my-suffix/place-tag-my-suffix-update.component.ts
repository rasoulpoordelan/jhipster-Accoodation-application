import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlaceTagMySuffix, PlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';
import { PlaceTagMySuffixService } from './place-tag-my-suffix.service';
import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix';
import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { TagMySuffixService } from 'app/entities/tag-my-suffix';

@Component({
  selector: 'jhi-place-tag-my-suffix-update',
  templateUrl: './place-tag-my-suffix-update.component.html'
})
export class PlaceTagMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  places: IPlaceMySuffix[];

  tags: ITagMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    placeId: [],
    tagId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placeTagService: PlaceTagMySuffixService,
    protected placeService: PlaceMySuffixService,
    protected tagService: TagMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placeTag }) => {
      this.updateForm(placeTag);
    });
    this.placeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaceMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaceMySuffix[]>) => response.body)
      )
      .subscribe((res: IPlaceMySuffix[]) => (this.places = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tagService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITagMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITagMySuffix[]>) => response.body)
      )
      .subscribe((res: ITagMySuffix[]) => (this.tags = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(placeTag: IPlaceTagMySuffix) {
    this.editForm.patchValue({
      id: placeTag.id,
      name: placeTag.name,
      placeId: placeTag.placeId,
      tagId: placeTag.tagId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placeTag = this.createFromForm();
    if (placeTag.id !== undefined) {
      this.subscribeToSaveResponse(this.placeTagService.update(placeTag));
    } else {
      this.subscribeToSaveResponse(this.placeTagService.create(placeTag));
    }
  }

  private createFromForm(): IPlaceTagMySuffix {
    return {
      ...new PlaceTagMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      placeId: this.editForm.get(['placeId']).value,
      tagId: this.editForm.get(['tagId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceTagMySuffix>>) {
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

  trackTagById(index: number, item: ITagMySuffix) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
