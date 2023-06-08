import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationsDetailComponent } from './hospitalizations-detail.component';

describe('HospitalizationsDetailComponent', () => {
  let component: HospitalizationsDetailComponent;
  let fixture: ComponentFixture<HospitalizationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizationsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalizationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
