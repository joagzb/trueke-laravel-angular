import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { routesSchema } from '../config/routes.schema';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: Router, useValue: router },
      ],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should assemble dynamic route using arguments in order', () => {
    service.navigateTo(routesSchema.offers.detail, ['123', '456']);
    expect(router.navigate).toHaveBeenCalledWith(['listings/123/offers/456/details/']);
  });
});
