import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ServicesDetailsComponent } from './services/services-details/services-details.component';
import { PetsComponent } from './pets/pets.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';
import { AddNewPetComponent } from './pets/add-new-pet/add-new-pet.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { HospitalizationComponent } from './pets/hospitalization/hospitalization.component';
import { GraphicReportsComponent } from './reports/graphic-reports/graphic-reports.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHospitalizationComponent } from './pets/add-hospitalization/add-hospitalization.component';
import { HospitalizationsComponent } from './hospitalizations/hospitalizations.component';
import { NgxMaskModule } from 'ngx-mask';
import { HospitalizationsDetailComponent } from './hospitalizations/hospitalizations-detail/hospitalizations-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddMedicationComponent } from './hospitalizations/add-medication/add-medication.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ProductsComponent } from './inventory/products/products.component';
import { AddProductComponent } from './inventory/products/add-product/add-product.component';
import { EditPetVacsComponent } from './pets/pet-details/edit-pet-vacs/edit-pet-vacs.component';
import { VaccinesComponent } from './inventory/vaccines/vaccines.component';
import { AddVaccinesComponent } from './inventory/vaccines/add-vaccines/add-vaccines.component';
import { DeleteComponent } from './common/delete/delete.component';
import { AddExamComponent } from './hospitalizations/add-exam/add-exam.component';
import { ReporPetComponent } from './repor-pet/repor-pet.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ServicesDetailsComponent,
    PetsComponent,
    PetDetailsComponent,
    AddNewPetComponent,
    SidebarMenuComponent,
    HospitalizationComponent,
    GraphicReportsComponent,
    AddHospitalizationComponent,
    HospitalizationsComponent,
    HospitalizationsDetailComponent,
    AddMedicationComponent,
    ProductsComponent,
    AddProductComponent,
    EditPetVacsComponent,
    VaccinesComponent,
    AddVaccinesComponent,
    DeleteComponent,
    AddExamComponent,
    ReporPetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    DashboardRoutingModule,
    NgxDropzoneModule,
    NgxMaskModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    CurrencyMaskModule
  ]
})
export class DashboardModule { }
