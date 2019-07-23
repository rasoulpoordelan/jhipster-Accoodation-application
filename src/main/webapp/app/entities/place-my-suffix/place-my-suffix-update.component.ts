import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlaceMySuffix, PlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from './place-my-suffix.service';
import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { AttributeMySuffixService } from 'app/entities/attribute-my-suffix';
import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';
import { PlaceTagMySuffixService } from 'app/entities/place-tag-my-suffix';

@Component({
  selector: 'jhi-place-my-suffix-update',
  templateUrl: './place-my-suffix-update.component.html'
})
export class PlaceMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  attributes: IAttributeMySuffix[];

  placetags: IPlaceTagMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    key: [],
    placeOwnerId: [],
    classCo: [],
    classExtra: [],
    metaKeywords: [],
    metaDescription: [],
    pageTitle: [],
    cityId: [],
    placeAreaId: [],
    addressLine1: [],
    addressLine2: [],
    location: [],
    phone1: [],
    phone2: [],
    fax: [],
    isVisible: [],
    defaultImageId: [],
    description: [],
    rulesAndRegulations: [],
    selectReason: [],
    review: [],
    checkinHour: [],
    checkoutHour: [],
    priority: [],
    totalScore: [],
    extraPersonPrice: [],
    halfChargeCheckIn: [],
    halfChargeCheckOut: [],
    defaultVideoUrl: [],
    virtualTourUrl: [],
    postalCode: [],
    cancellationPolicy: [],
    bedroom: [],
    bathRoom: [],
    lavatory: [],
    wC: [],
    infrastructureArea: [],
    totalArea: [],
    capacity: [],
    maxCapacity: [],
    registrationSource: [],
    bookingPolicy: [],
    reviewStatus: [],
    status: [],
    basePrice: [],
    commission: [],
    placeAtts: [],
    places: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placeService: PlaceMySuffixService,
    protected attributeService: AttributeMySuffixService,
    protected placeTagService: PlaceTagMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ place }) => {
      this.updateForm(place);
    });
    this.attributeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAttributeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAttributeMySuffix[]>) => response.body)
      )
      .subscribe((res: IAttributeMySuffix[]) => (this.attributes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.placeTagService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaceTagMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaceTagMySuffix[]>) => response.body)
      )
      .subscribe((res: IPlaceTagMySuffix[]) => (this.placetags = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(place: IPlaceMySuffix) {
    this.editForm.patchValue({
      id: place.id,
      name: place.name,
      key: place.key,
      placeOwnerId: place.placeOwnerId,
      classCo: place.classCo,
      classExtra: place.classExtra,
      metaKeywords: place.metaKeywords,
      metaDescription: place.metaDescription,
      pageTitle: place.pageTitle,
      cityId: place.cityId,
      placeAreaId: place.placeAreaId,
      addressLine1: place.addressLine1,
      addressLine2: place.addressLine2,
      location: place.location,
      phone1: place.phone1,
      phone2: place.phone2,
      fax: place.fax,
      isVisible: place.isVisible,
      defaultImageId: place.defaultImageId,
      description: place.description,
      rulesAndRegulations: place.rulesAndRegulations,
      selectReason: place.selectReason,
      review: place.review,
      checkinHour: place.checkinHour,
      checkoutHour: place.checkoutHour,
      priority: place.priority,
      totalScore: place.totalScore,
      extraPersonPrice: place.extraPersonPrice,
      halfChargeCheckIn: place.halfChargeCheckIn,
      halfChargeCheckOut: place.halfChargeCheckOut,
      defaultVideoUrl: place.defaultVideoUrl,
      virtualTourUrl: place.virtualTourUrl,
      postalCode: place.postalCode,
      cancellationPolicy: place.cancellationPolicy,
      bedroom: place.bedroom,
      bathRoom: place.bathRoom,
      lavatory: place.lavatory,
      wC: place.wC,
      infrastructureArea: place.infrastructureArea,
      totalArea: place.totalArea,
      capacity: place.capacity,
      maxCapacity: place.maxCapacity,
      registrationSource: place.registrationSource,
      bookingPolicy: place.bookingPolicy,
      reviewStatus: place.reviewStatus,
      status: place.status,
      basePrice: place.basePrice,
      commission: place.commission,
      placeAtts: place.placeAtts,
      places: place.places
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const place = this.createFromForm();
    if (place.id !== undefined) {
      this.subscribeToSaveResponse(this.placeService.update(place));
    } else {
      this.subscribeToSaveResponse(this.placeService.create(place));
    }
  }

  private createFromForm(): IPlaceMySuffix {
    return {
      ...new PlaceMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      key: this.editForm.get(['key']).value,
      placeOwnerId: this.editForm.get(['placeOwnerId']).value,
      classCo: this.editForm.get(['classCo']).value,
      classExtra: this.editForm.get(['classExtra']).value,
      metaKeywords: this.editForm.get(['metaKeywords']).value,
      metaDescription: this.editForm.get(['metaDescription']).value,
      pageTitle: this.editForm.get(['pageTitle']).value,
      cityId: this.editForm.get(['cityId']).value,
      placeAreaId: this.editForm.get(['placeAreaId']).value,
      addressLine1: this.editForm.get(['addressLine1']).value,
      addressLine2: this.editForm.get(['addressLine2']).value,
      location: this.editForm.get(['location']).value,
      phone1: this.editForm.get(['phone1']).value,
      phone2: this.editForm.get(['phone2']).value,
      fax: this.editForm.get(['fax']).value,
      isVisible: this.editForm.get(['isVisible']).value,
      defaultImageId: this.editForm.get(['defaultImageId']).value,
      description: this.editForm.get(['description']).value,
      rulesAndRegulations: this.editForm.get(['rulesAndRegulations']).value,
      selectReason: this.editForm.get(['selectReason']).value,
      review: this.editForm.get(['review']).value,
      checkinHour: this.editForm.get(['checkinHour']).value,
      checkoutHour: this.editForm.get(['checkoutHour']).value,
      priority: this.editForm.get(['priority']).value,
      totalScore: this.editForm.get(['totalScore']).value,
      extraPersonPrice: this.editForm.get(['extraPersonPrice']).value,
      halfChargeCheckIn: this.editForm.get(['halfChargeCheckIn']).value,
      halfChargeCheckOut: this.editForm.get(['halfChargeCheckOut']).value,
      defaultVideoUrl: this.editForm.get(['defaultVideoUrl']).value,
      virtualTourUrl: this.editForm.get(['virtualTourUrl']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      cancellationPolicy: this.editForm.get(['cancellationPolicy']).value,
      bedroom: this.editForm.get(['bedroom']).value,
      bathRoom: this.editForm.get(['bathRoom']).value,
      lavatory: this.editForm.get(['lavatory']).value,
      wC: this.editForm.get(['wC']).value,
      infrastructureArea: this.editForm.get(['infrastructureArea']).value,
      totalArea: this.editForm.get(['totalArea']).value,
      capacity: this.editForm.get(['capacity']).value,
      maxCapacity: this.editForm.get(['maxCapacity']).value,
      registrationSource: this.editForm.get(['registrationSource']).value,
      bookingPolicy: this.editForm.get(['bookingPolicy']).value,
      reviewStatus: this.editForm.get(['reviewStatus']).value,
      status: this.editForm.get(['status']).value,
      basePrice: this.editForm.get(['basePrice']).value,
      commission: this.editForm.get(['commission']).value,
      placeAtts: this.editForm.get(['placeAtts']).value,
      places: this.editForm.get(['places']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceMySuffix>>) {
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

  trackAttributeById(index: number, item: IAttributeMySuffix) {
    return item.id;
  }

  trackPlaceTagById(index: number, item: IPlaceTagMySuffix) {
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
