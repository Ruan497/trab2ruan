import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporPetComponent } from './repor-pet.component';

describe('ReporPetComponent', () => {
  let component: ReporPetComponent;
  let fixture: ComponentFixture<ReporPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
