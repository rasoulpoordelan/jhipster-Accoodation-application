/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix/place-my-suffix.service';
import { IPlaceMySuffix, PlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

describe('Service Tests', () => {
  describe('PlaceMySuffix Service', () => {
    let injector: TestBed;
    let service: PlaceMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlaceMySuffix;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlaceMySuffixService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PlaceMySuffix(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PlaceMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PlaceMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PlaceMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            key: 'BBBBBB',
            placeOwnerId: 'BBBBBB',
            classCo: 1,
            classExtra: 'BBBBBB',
            metaKeywords: 'BBBBBB',
            metaDescription: 'BBBBBB',
            pageTitle: 'BBBBBB',
            cityId: 'BBBBBB',
            placeAreaId: 1,
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            location: 'BBBBBB',
            phone1: 'BBBBBB',
            phone2: 'BBBBBB',
            fax: 'BBBBBB',
            isVisible: true,
            defaultImageId: 1,
            description: 'BBBBBB',
            rulesAndRegulations: 'BBBBBB',
            selectReason: 'BBBBBB',
            review: 'BBBBBB',
            checkinHour: 1,
            checkoutHour: 1,
            priority: 1,
            totalScore: 1,
            extraPersonPrice: 1,
            halfChargeCheckIn: 1,
            halfChargeCheckOut: 1,
            defaultVideoUrl: 'BBBBBB',
            virtualTourUrl: 'BBBBBB',
            postalCode: 'BBBBBB',
            cancellationPolicy: 'BBBBBB',
            bedroom: 1,
            bathRoom: 1,
            lavatory: 1,
            wC: 1,
            infrastructureArea: 1,
            totalArea: 1,
            capacity: 1,
            maxCapacity: 1,
            registrationSource: 'BBBBBB',
            bookingPolicy: 1,
            reviewStatus: 1,
            status: 1,
            basePrice: 1,
            commission: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PlaceMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            key: 'BBBBBB',
            placeOwnerId: 'BBBBBB',
            classCo: 1,
            classExtra: 'BBBBBB',
            metaKeywords: 'BBBBBB',
            metaDescription: 'BBBBBB',
            pageTitle: 'BBBBBB',
            cityId: 'BBBBBB',
            placeAreaId: 1,
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            location: 'BBBBBB',
            phone1: 'BBBBBB',
            phone2: 'BBBBBB',
            fax: 'BBBBBB',
            isVisible: true,
            defaultImageId: 1,
            description: 'BBBBBB',
            rulesAndRegulations: 'BBBBBB',
            selectReason: 'BBBBBB',
            review: 'BBBBBB',
            checkinHour: 1,
            checkoutHour: 1,
            priority: 1,
            totalScore: 1,
            extraPersonPrice: 1,
            halfChargeCheckIn: 1,
            halfChargeCheckOut: 1,
            defaultVideoUrl: 'BBBBBB',
            virtualTourUrl: 'BBBBBB',
            postalCode: 'BBBBBB',
            cancellationPolicy: 'BBBBBB',
            bedroom: 1,
            bathRoom: 1,
            lavatory: 1,
            wC: 1,
            infrastructureArea: 1,
            totalArea: 1,
            capacity: 1,
            maxCapacity: 1,
            registrationSource: 'BBBBBB',
            bookingPolicy: 1,
            reviewStatus: 1,
            status: 1,
            basePrice: 1,
            commission: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PlaceMySuffix', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
