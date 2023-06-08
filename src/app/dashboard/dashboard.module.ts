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
    HospitalizationsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    DashboardRoutingModule,
    NgxDropzoneModule,
    NgxMaskModule
  ]
})
export class DashboardModule { }
