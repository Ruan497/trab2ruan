import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationsComponent } from './hospitalizations.component';

describe('HospitalizationsComponent', () => {
  let component: HospitalizationsComponent;
  let fixture: ComponentFixture<HospitalizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
