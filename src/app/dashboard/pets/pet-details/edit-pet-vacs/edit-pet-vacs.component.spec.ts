import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetVacsComponent } from './edit-pet-vacs.component';

describe('EditPetVacsComponent', () => {
  let component: EditPetVacsComponent;
  let fixture: ComponentFixture<EditPetVacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPetVacsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPetVacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
