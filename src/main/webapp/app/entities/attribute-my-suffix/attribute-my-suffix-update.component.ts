import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAttributeMySuffix, AttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { AttributeMySuffixService } from './attribute-my-suffix.service';
import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix';

@Component({
  selector: 'jhi-attribute-my-suffix-update',
  templateUrl: './attribute-my-suffix-update.component.html'
})
export class AttributeMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  places: IPlaceMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected attributeService: AttributeMySuffixService,
    protected placeService: PlaceMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attribute }) => {
      this.updateForm(attribute);
    });
    this.placeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaceMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaceMySuffix[]>) => response.body)
      )
      .subscribe((res: IPlaceMySuffix[]) => (this.places = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(attribute: IAttributeMySuffix) {
    this.editForm.patchValue({
      id: attribute.id,
      name: attribute.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const attribute = this.createFromForm();
    if (attribute.id !== undefined) {
      this.subscribeToSaveResponse(this.attributeService.update(attribute));
    } else {
      this.subscribeToSaveResponse(this.attributeService.create(attribute));
    }
  }

  private createFromForm(): IAttributeMySuffix {
    return {
      ...new AttributeMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttributeMySuffix>>) {
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
