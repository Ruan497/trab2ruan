import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalizationComponent } from './add-hospitalization.component';

describe('AddHospitalizationComponent', () => {
  let component: AddHospitalizationComponent;
  let fixture: ComponentFixture<AddHospitalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHospitalizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHospitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
